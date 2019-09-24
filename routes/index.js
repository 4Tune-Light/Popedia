const express = require('express')
const Router = express.Router()

const usersRoutes = require('./users')
const productsRoutes = require('./products')
const categoriesRoutes = require('./categories')
 
Router.use('/users', usersRoutes)

Router.use('/products', productsRoutes)

Router.use('/categories', categoriesRoutes)

module.exports = Router