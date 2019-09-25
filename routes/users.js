const express = require('express')
const Router = express.Router()

const Control = require('../controllers/users')


Router.post('/login', Control.loginUsers)

Router.post('/register', Control.registerUsers)

// Router.post('/forgot', Control.createProducts)

module.exports = Router