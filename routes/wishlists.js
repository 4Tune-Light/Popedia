const express = require('express')
const Router = express.Router()

const Control = require('../controllers/wishlists')

Router.get('/', Control.getWishlists)

Router.get('/:user_id', Control.getWishlistsByUser)

Router.get('/:user_id/:id', Control.getWishlistsById)

Router.post('/', Control.createWishlists)

Router.delete('/:id', Control.deleteWishlists)

module.exports = Router