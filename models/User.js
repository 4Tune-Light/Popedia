require('dotenv/config')
const mongoose = require('mongoose')
var bcrypt = require('bcryptjs')

const saltRounds = parseInt(process.env.SALT)
const baconSecret = process.env.BACON

const Schema = mongoose.Schema

const UserSchema = new Schema({
	email: {
		type: String,
		index: { unique: true },
		required: true,
	},

	name: {
		type: String,
		required: true,
	},

	number: {
		type: String,
	},

	gender: {
		type: String,
	},

	date: {
		type: Date,
	},

	password: {
		type: String,
		required: true,
	},

	shop_id: {
		type: Schema.Types.ObjectId,
		ref: 'Shop',
	},

	history_id: {
		type: Schema.Types.ObjectId,
		ref: 'History',
	},

},

{

	timestamps: true

})

UserSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel