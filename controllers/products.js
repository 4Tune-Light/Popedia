const Model = require('../models/Product')
const app = require('../app')
const multer = require('multer')
const fs = require('fs')

exports.getProducts = (req, res, next) => {
	Model.find().populate('category_id', 'name').populate('user_id', 'email name').sort({updatedAt: -1})
	.then(data => {
		if (data.length > 0) {

			app.client.set('products', JSON.stringify(data))

			res.json({
				status: 200,
				error: false,
				data
			})
		} else {
			res.status(404).json({
				status: 404,
				error: true,
				message: 'Products not found'
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

exports.getProductsById = (req, res, next) => {
	Model.findById(req.params.id).populate('category_id', 'name').populate('user_id', 'name email')
	.then(data => {
		if (data) {
			res.json({
				status: 200,
				error: false,
				data
			})
		} else {
			res.status(404).json({
				status: 404,
				error: true,
				message: 'Products not found'
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

exports.getProductsByCategory = (req, res, next) => {
	Model.find({category_id: req.params.id}).populate('category_id', 'name').populate('user_id', 'name email')
	.then(data => {
		if (data) {
			res.json({
				status: 200,
				error: false,
				data
			})
		} else {
			res.status(404).json({
				status: 404,
				error: true,
				message: 'Products not found'
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

exports.getProductsByUser = (req, res, next) => {
	Model.find({user_id: req.params.id}).populate('category_id', 'name').populate('user_id', 'name email')
	.then(data => {
		if (data) {
			res.json({
				status: 200,
				error: false,
				data
			})
		} else {
			res.status(404).json({
				status: 404,
				error: true,
				message: 'Products not found'
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



exports.createProducts = (req, res, next) => {
	const doc = new Model({
		name: req.body.name,
		image: '/api/products/images/' + req.file.filename,
		price: req.body.price,
		category_id: req.body.category_id,
		quantity: req.body.quantity,
		description: req.body.description,
		user_id: req.body.user_id,
	})

	doc.save()
	.then(data => {
		app.client.del('products')
		res.json({
			status: 200,
			error: false,
			data
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

exports.updateProducts = (req, res, next) => {
	Model.updateOne(
		{_id: req.body.id },
		{
			name: req.body.name,
			image: '/api/products/images/' + req.file.filename,
			price: req.body.price,
			category_id: req.body.category_id,
			quantity: req.body.quantity,
			description: req.body.description,
		}
	)
	.then(response => {
		if (response.nModified > 0) {
			app.client.del('products')
			res.json({
				status: 200,
				error: false,
				message: 'Successfully updated Products with id: ' + req.params.id
			})
		} else {
			res.status(404).json({
				status: 404,
				error: true,
				message: 'Failed to update Products, Products not found' 
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

exports.checkout = (req, res, next) => {
	const action = req.body.cart.map(item => {
		const counter = -1 * item.by
		const data = null
		Model.update(
			{ _id: item._id},
			{ $inc: { quantity: counter } }
		)
		.then(res => data = res)
		return data
	})
	
	Promise.all(action)
	.then(something => {
		app.client.del('products')
		res.json({
			status: 200,
			error: false,
			message: `Successfully to Checkout`,
		})
	})
	.catch(err => {
		res.status(400).json({
			status: 400,
			error: true,
			message: err.message,
		})
	})
}




exports.deleteProducts = (req, res, next) => {
	Model.findOneAndRemove({_id: req.params.id})
	.then(data => {
		if (data) {
			app.client.del('products')
			fs.unlinkSync(app.rootPath + '/uploads/products/' + data.image.substr(39))
			res.json({
				status: 200,
				error: false,
				message: 'Successfully removed Prodcts with id: ' + req.params.id
			})
		} else {
			res.status(404).json({
				status: 404,
				error: true,
				message: 'Failed to remove Products, cannot find products with id: ' + req.params.id
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

exports.refreshRedis = (req, res, next) => {
	app.client.del('products')
	res.redirect('/api/products')
}
