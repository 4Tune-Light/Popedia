const Model = require('../models/Category')

exports.getCategories = (req, res, next) => {
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
					message: 'Categories not found'
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

exports.getCategoriesById = (req, res, next) => {
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
					message: 'Categories not found'
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

exports.createCategories = (req, res, next) => {
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

exports.updateCategories = (req, res, next) => {
	Model.updateOne(
		{_id: req.params.id},
		{name: req.body.name}
	)
	.then(response => {
		if (response.nModified > 0) {
			res.json({
				status: 200,
				error: false,
				message: 'Successfully updated Categories with id: ' + req.params.id
			})
		} else {
			res.status(404).json({
				status: 404,
				error: true,
				message: 'Failed to update Categories, Categories not found' 
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

exports.deleteCategories = (req, res, next) => {
	Model.remove({_id: req.params.id})
		.then(data => {
			res.json({
				status: 200,
				error: false,
				message: 'Successfully removed Categories with id: ' + req.params.id
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
