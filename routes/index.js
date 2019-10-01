const express = require('express')
const Router = express.Router()

const usersRoutes = require('./users')
const productsRoutes = require('./products')
const categoriesRoutes = require('./categories')
const historiesRoutes = require('./histories')
const wishlistsRoutes = require('./wishlists')

Router.use('/users', usersRoutes)

Router.use('/products', productsRoutes)

Router.use('/categories', categoriesRoutes)

Router.use('/histories', historiesRoutes)

Router.use('/wishlists', wishlistsRoutes)

module.exports = Router