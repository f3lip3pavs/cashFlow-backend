const Route = require('express').Router()
const authController = require('../controller/authController')

Route.post('/', authController.auth);

module.exports = Route;