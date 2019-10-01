const Model = require('../models/Wishlist')

exports.getWishlists = (req, res, next) => {
	Model.find().populate('product_id')
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
					message: 'Wishlists not found'
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

exports.getWishlistsByUser = (req, res, next) => {
	Model.find({user_id: req.params.user_id}).populate('product_id')
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
					message: 'Wishlists not found'
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

exports.getWishlistsById = (req, res, next) => {
	Model.findById(req.params.id).populate('product_id')
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
					message: 'Wishlists not found'
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

exports.createWishlists = (req, res, next) => {
	const doc = new Model({
		user_id: req.body.user_id,
		product_id: req.body.product_id,
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

exports.deleteWishlists = (req, res, next) => {
	Model.remove({_id: req.params.id})
		.then(data => {
			res.json({
				status: 200,
				error: false,
				message: 'Successfully removed Wishlists with id: ' + req.params.id
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
