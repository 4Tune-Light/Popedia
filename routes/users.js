const express = require('express')
const Router = express.Router()

const Control = require('../controllers/users')


Router.post('/login', Control.loginUsers)

Router.post('/register', Control.registerUsers)

Router.post('/verify', Control.verification)

Router.post('/resend', Control.resendOTP)

Router.post('/forgot', Control.forgotPassword)

Router.get('/reset/:key', Control.resetForm)

Router.post('/reset/:key', Control.resetPassword)

module.exports = Router