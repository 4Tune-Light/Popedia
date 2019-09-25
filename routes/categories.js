const express = require('express')
const Router = express.Router()

const Control = require('../controllers/categories')

Router.get('/', Control.getCategories)

Router.get('/:id', Control.getCategoriesById)

Router.post('/', Control.createCategories)

Router.put('/:id', Control.updateCategories)

Router.delete('/:id', Control.deleteCategories)

module.exports = Router