const Router = require('express').Router()
const error = require('../errors/error')
const db = require('../db')

const authorize = require('../middlewares/authorize')

Router.post('/', authorize, async (req, res) => {

})

module.exports = Router

