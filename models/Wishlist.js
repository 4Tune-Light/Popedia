const mongoose = require('mongoose')

const Schema = mongoose.Schema

const WishlistSchema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},

	product_id: {
		type: Schema.Types.ObjectId,
		ref: 'Product',
		required: true,
	},

},{
	timestamps: true
})

const WishlistModel = mongoose.model('Wishlist', WishlistSchema)

module.exports = WishlistModel