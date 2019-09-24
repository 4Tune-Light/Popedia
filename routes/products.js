const express = require('express')
const Router = express.Router()

const Control = require('../controllers/products')


Router.get('/', Control.getProducts)

Router.get('/:id', Control.getProductsById)

Router.post('/', Control.createProducts)

Router.put('/:id', Control.updateProducts)

Router.patch('/:id', Control.addOrReduce)

Router.delete('/:id', Control.deleteProducts)

module.exports = Router