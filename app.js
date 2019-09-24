require('dotenv/config')

const express = require('express')
const app = express()

const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')


const Routes = require('./routes')

const Product = require('./models/Product')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(logger('short'))
app.use(cors())

app.use('/api', Routes)

mongoose.connect(process.env.DB_CONNECTION, 
	{ useNewUrlParser: true, useUnifiedTopology: true }, 
	() => {
		console.log('DB Connected!')
	}
)

app.listen(process.env.PORT, () => {
	console.log('Server is UP')
})