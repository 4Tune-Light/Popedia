const mongoose = require('mongoose')

const Schema = mongoose.Schema

const HistorySchema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},

	product_id: [{
		type: Schema.Types.ObjectId,
		ref: 'Product',
		required: true,
	}],

},{
	timestamps: true
})

const HistoryModel = mongoose.model('History', HistorySchema)

module.exports = HistoryModel