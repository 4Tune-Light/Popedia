const Model = require('../models/Product')

exports.getProducts = (req, res, next) => {
	Model.find()
	.then(data => {
		if (data.length > 0) {
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
		name: req.body.name
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
		{name: req.body.name}
	)
	.then(() => {
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
			message: err.message
		})
	})
}

exports.addOrReduce = (req, res, next) => {

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
