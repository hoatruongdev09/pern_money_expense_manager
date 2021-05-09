const jwt = require('jsonwebtoken')
require('dotenv').config()

function tokenGenerator(user_id) {
    const payload = {
        user: user_id
    }
    var token = jwt.sign(payload, process.env.jwtSecret, { expiresIn: '2days' })
    return token
}

module.exports = tokenGenerator;