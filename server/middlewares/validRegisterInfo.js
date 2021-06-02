const error = require('../errors/error')
const validateEmail = require('../utils/verifyEmail')
const validatePhone = require('../utils/verifyPhone')
const validatePassword = require('../utils/veryPassword')


const validInfo = (req, res, next) => {

    try {
        const { email, password, confirmPassword } = req.body
        if (![email, password, confirmPassword].every(Boolean)) {
            return error.badRequest(res, "Required info need to be filled!")
        }
        if (!validateEmail(email)) {
            return error.badRequest(res, "Email is not valid format!")
        }
        if (password !== confirmPassword) {
            return error.badRequest(res, "Confirm password and password is not the same!")
        }
        // if (!validatePassword(password)) {
        //     return error.badRequest(res, "Password must be 8 characters, contains at least 1 UPPERCASE character, 1 special character, and 1 number character")
        // }
        next()
    } catch (err) {
        return error.internalError(res, err.message)
    }
}

module.exports = validInfo