const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProductSchema = new Schema({
	name: {
		type: String,
		required: true,
	},

	image: {
		type: String,
		required: true,
	},

	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
		required: true,
	},

	quantity: {
		type: Number,
		required: true,
	},

	description: {
		type: String,
		required: true,
	},

	shop: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
	},

	history: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
	},

	created_at: {
		type: Date,
		default: Date.now,
	},

	updated_at: {
		type: Date,
		default: Date.now,
	},
})

const ProductModel = mongoose.model('Product', ProductSchema)

module.exports = ProductModel