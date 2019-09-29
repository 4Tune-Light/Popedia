const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProductSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},

	image: {
		type: String,
		required: true,
		trim: true,
	},

	category_id: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
		required: true,
	},

	quantity: {
		type: Number,
		required: true,
		trim: true,
	},

	price: {
		type: Number,
		required: true,
		trim: true,
	},

	description: {
		type: String,
		required: true,
		trim: true,
	},

	user_id: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	}
	
},{
	timestamps: true
})

const ProductModel = mongoose.model('Product', ProductSchema)

module.exports = ProductModel