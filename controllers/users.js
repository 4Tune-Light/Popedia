const Model = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const saltRounds = parseInt(process.env.SALT)
const baconSecret = process.env.BACON

exports.loginUsers = (req, res, next) => {
	Model.findOne({email: req.body.email})
		.then(data => {
			if (data) {
				bcrypt.compare(req.body.password, data.password, function(err, result) {
					if (result === true) {
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
						console.log(data.password)
						console.log(req.body.password)
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
			token
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