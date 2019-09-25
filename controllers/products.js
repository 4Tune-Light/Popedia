const Model = require('../models/Product')
const redis = require('../app')

exports.getProducts = (req, res, next) => {
	Model.find()
	.then(data => {
		if (data.length > 0) {

			redis.client.setex('products', 86400, data)

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
	Model.findById(req.params.id)
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
		image: req.body.image,
		category_id: req.body.category_id,
		quantity: req.body.quantity,
		description: req.body.description,
	})

	doc.save()
	.then(data => {
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
		{_id: req.params.id},
		{
			name: req.body.name,
			image: req.body.image,
			category_id: req.body.category_id,
			quantity: req.body.quantity,
			description: req.body.description,
		}
	)
	.then(response => {
		if (response.nModified > 0) {
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
			error123: 'errornya disini mas'
		})
	})
}

exports.addOrReduce = (req, res, next) => {
	let counter = 0
	let message = ''
	if (req.body.action === 'add') { 
		counter = 1
		message = 'Added'
	} else if (req.body.action === 'reduce') { 
		counter = -1
		message = 'Reduced'
	}

	Model.updateOne(
		{_id: req.params.id},
		{$inc: {quantity: counter}}
	)
	.then(response => {
		if (response.nModified > 0) {
			res.json({
				status: 200,
				error: false,
				message: `Successfully ${message} Products with id: ` + req.params.id
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
			message: err.message
		})
	})
}

exports.deleteProducts = (req, res, next) => {
	Model.remove({_id: req.params.id})
	.then(data => {
		res.json({
			status: 200,
			error: false,
			message: 'Successfully removed Prodcts with id: ' + req.params.id
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
