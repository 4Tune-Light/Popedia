const express = require('express')
const Router = express.Router()

const Control = require('../controllers/histories')

Router.get('/', Control.getHistories)

Router.get('/:user_id', Control.getHistoriesByUser)

Router.get('/:user_id/:id', Control.getHistoriesById)

Router.post('/', Control.createHistories)

Router.delete('/:id', Control.deleteHistories)

module.exports = Router