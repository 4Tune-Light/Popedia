const express = require('express')
const Router = express.Router()

const categoryRoutes = require('./categories')
 
// Router.user('/user', )
// Router.use('/product', )

Router.use('/category', categoryRoutes)

module.exports = Router