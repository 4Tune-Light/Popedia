require('dotenv/config')

const express = require('express')
const app = express()

const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const redis = require('redis')

const client = redis.createClient(6379)

const Routes = require('./routes')

const Product = require('./models/Product')

app.use(express.static(__dirname + '/views'))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(logger('short'))
app.use(cors())

app.use('/api', Routes)

app.use(function(req, res, next) {
  res.status(404).json({
  	status: 404,
  	error: true,
  	message: '404 Page Not Found'
  })
});

mongoose.connect(process.env.DB_CONNECTION, 
	{ useNewUrlParser: true, useUnifiedTopology: true,
	  useFindAndModify: false, createIndexes: true }, 
	() => {
		console.log('DB Connected!')
	}
)

app.listen(process.env.PORT, () => {
	console.log('Server is UP')
})

module.exports.client = client
module.exports.rootPath = __dirname