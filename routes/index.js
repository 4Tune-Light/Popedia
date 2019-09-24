const express = require('express')
const Router = express.Router()

const productsRoutes = require('./products')
const categoriesRoutes = require('./categories')
 
// Router.user('/user', )

Router.use('/products', productsRoutes)

Router.use('/categories', categoriesRoutes)

module.exports = Router