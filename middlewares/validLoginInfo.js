const error = require('../errors/error')

const validateEmail = require('../utils/verifyEmail')
const validatePhone = require('../utils/verifyPhone')

const validInfo = (req, res, next) => {
    try {
        const { email, password } = req.body
        if (![email, password].every(Boolean)) {
            return error.badRequest(res, "Required info need to be filled !")
        }
        if (!validateEmail(email)) {
            if (!validatePhone(email)) {
                return error.badRequest(res, "Email or phone number is not accepted")
            }
        }
        next()
    } catch (err) {
        return error.internalError(res, err.message)
    }
}

module.exports = validInfo