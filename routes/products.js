const express = require('express')
const Router = express.Router()

const Control = require('../controllers/products')


Router.get('/')

Router.get('/:id')

Router.post('/')

Router.put('/:id')

Router.patch('/:id')

Router.delete('/:id')

module.exports = Router