const error = require('../errors/error')
const validateEmail = require('../utils/verifyEmail')
const validatePhone = require('../utils/verifyPhone')
const validatePassword = require('../utils/veryPassword')


const validInfo = (req, res, next) => {

    try {
        const { user_name, email, password, phone, address } = req.body
        if (![user_name, email, password, phone].every(Boolean)) {
            return error.badRequest(res, "Required info need to be filled !")
        }
        if (!validateEmail(email)) {
            return error.badRequest(res, "Email is not valid")
        }
        if (!validatePhone(phone)) {
            return error.badRequest(res, "Phone number must be 10 number character")
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