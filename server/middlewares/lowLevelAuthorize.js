const jwt = require('jsonwebtoken')
const error = require('../errors/error')
require("dotenv").config()

const authorize = async (req, res, next) => {
    try {
        const authToken = req.headers['authorization'] || ''
        const token = authToken.split(' ')[1]
        if (token == null || token == '') {
            next()
            return
        }
        const payload = jwt.verify(token, process.env.jwtSecret)
        req.user = payload.user
        next()
    } catch (err) {
        error.internalError(res, err.message)
    }


}
module.exports = authorize