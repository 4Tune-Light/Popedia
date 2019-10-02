require('dotenv/config')
const Model = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const app = require('../app')
const path = require('path')

const resendMail = require('../configs/resendMail')
const resetMail = require('../configs/resetMail')

const saltRounds = parseInt(process.env.SALT)
const baconSecret = process.env.BACON

exports.loginUsers = (req, res, next) => {
	Model.findOne({email: req.body.email})
	.then(data => {
		if (data) {			
			bcrypt.compare(req.body.password, data.password, function(err, result) {
				if (result === true) {
					if (data.verification === true) {
						const token = jwt.sign({name: data.name, email: data.email}, process.env.JWT_KEY);
						res.json({
							status: 200,
							error: false,
							user: {
								_id: data._id,
								name: data.name,
								email: data.email
							},
							token
						})
					} else {
						res.status(400).json({
							status: 400,
							error: true,
							validate: false,
							message: 'Account haven\'t been verificated'
						})
					}
				} else {
					res.status(400).json({
						status: 400,
						error: true,
						message: 'Email or Password is wrong'
					})
				}
			})
		} else {
			res.status(400).json({
				status: 400,
				error: true,
				message: 'Email or Password is wrong'
			})
		}
	})
	.catch(err => {
		res.status(400).json({
			status: 400,
			error: true,
			message: err.message
		})
	})
}

exports.registerUsers = (req, res, next) => {
	const doc = new Model({
		email: req.body.email,
		name: req.body.name,
		number: req.body.number,
		password: req.body.password,
	})

	doc.save()
	.then(data => {
		const generateOTP = () => { 
	    const digits = '0123456789'; 
	    let OTP = ''; 
	    for (let i = 0; i < 6; i++ ) { 
	        OTP += digits[Math.floor(Math.random() * 10)]; 
	    } 
	    return OTP; 
		} 

		const otp = generateOTP();

		resendMail(data.email, otp)

		res.json({
			status: 200,
			error: false,
			otp
		})
	})
	.catch(err => {
		res.status(400).json({
			status: 400,
			error: true,
			message: err.message
		})
	})	
}


exports.updateUsers = (req, res, next) => {
	Model.updateOne(
		{ _id: req.body.id },
		{ 
			email: req.body.email,
			name: req.body.name,
			number: req.body.number,
			password: req.body.password,
		}

	)
	.then(response => {
		if (response.nModified > 0) {
			app.client.del('products')
			res.json({
				status: 200,
				error: false,
				message: 'Successfully updated Users with id: ' + req.params.id
			})
		} else {
			res.status(404).json({
				status: 404,
				error: true,
				message: 'Failed to update Users, Products not found' 
			})
		}
	})
	.catch(err => {
		res.status(400).json({
			status: 400,
			error: true,
			message: err.message,
		})
	})
}



exports.verification = async (req, res, next) => {
	app.client.get(req.body.email, (err, otp) => {
		if (err) next(err);

		if (req.body.otp === otp) {
			app.client.del(req.body.email)
			Model.findOneAndUpdate(
				{email: req.body.email},
				{verification: true}
			)
			.then(data => {
				const token = jwt.sign(
					{name: data.name, email: data.email},
					process.env.JWT_KEY
				)
				res.json({
					status: 200,
					error: false,
					user: {
						_id: data._id,
						name: data.name,
						email: data.email
					},
					token,
					message: 'Verification Success'
				})
			})
			.catch(err => {
				res.status(400).json({
					status: 400,
					error: true,
					message: err.message,
				})
			})
		} else {
			res.status(400).json({
				status: 400,
				error: true,
				message: 'Wrong Code',
			})
		}
	})	
}

exports.resendOTP = async (req, res, next) => {
	const generateOTP = () => { 
    const digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 6; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
    return OTP; 
	} 

	const otp = generateOTP();

	await resendMail(req.body.email, otp)

	res.json({
		otp
	})
}

exports.forgotPassword = (req, res, next) => {
	Model.findOne({email: req.body.email})
	.then(async (data) => {
		if (data) {
			const token = await jwt.sign(
				{email: data.email},
				process.env.JWT_KEY
			)

			resetMail(data.name, data.email, token)

			res.json({
				status: 200,
				error: false,
				message: 'Email has been sent'
			})
		} else {
			res.status(404).json({
				status: 404,
				error: true,
				message: 'Cannot find account with email: ' + req.body.email
			})
		}
	})
	.catch(err => {
		res.status(400).json({
			status: 400,
			error: true,
			message: err.message
		})
	})	
}

exports.resetForm = (req, res, next) => {
	jwt.verify(req.params.key, process.env.JWT_KEY, async (err, data) => {
		app.client.get(data.email, (err, key) => {
			if (key === req.params.key) {
				res.sendFile(path.join(app.rootPath + '/views/resetForm.html'))
			} else {
				res.sendFile(path.join(app.rootPath + '/views/expired.html'))
			}
		})
	})
	
}

exports.resetPassword = (req, res, next) => {
	Model.findOne({email: req.body.email})
	.then(data => {
		if (data) {
			app.client.del(data.email)
			data.password = req.body.password
			data.save()
			res.json({
				status: 200,
				error: false,
				message: 'Successfully changed password'
			})
		} else {
			res.status(404).json({
				status: 404,
				error: true,
				message: 'Failed to change password, Email not found' 
			})
		}
	})
	.catch(err => {
		res.status(400).json({
			status: 400,
			error: true,
			message: err.message,
		})
	})
}