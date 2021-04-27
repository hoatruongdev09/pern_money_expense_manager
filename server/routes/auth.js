const Router = require('express').Router()
const tokenGenerator = require('../utils/tokenGenerator')
const bcrypt = require('bcrypt')
const error = require('../errors/error')
const db = require('../db')

const validRegiserInfo = require('../middlewares/validRegisterInfo')
const validLoginInfo = require('../middlewares/validLoginInfo')
const authorize = require('../middlewares/authorize')

Router.post('/register', validRegiserInfo, async (req, res) => {
    try {

        const { user_name, email, password, phone, address } = req.body

        const users = await db.query('SELECT * FROM users WHERE user_email=$1 OR user_phone=$2', [email, phone])
        if (users.rowCount != 0) {
            return error.unauthorized(res, "Email or phone existed");
        }
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

        const user = await db.query('INSERT INTO users(user_name,user_email,user_phone,user_address,user_password) VALUES($1,$2,$3,$4,$5) RETURNING*',
            [user_name, email, phone, address, bcryptPassword])

        const token = tokenGenerator(user.rows[0].user_id)

        return res.json({ token })
    } catch (err) {
        error.internalError(res, err.message)
    }

})

Router.post('/login', validLoginInfo, async (req, res) => {
    const { email, password } = req.body

    try {
        const users = await db.query('SELECT * FROM users WHERE user_email=$1 OR user_phone=$2', [email, email])
        if (users.rowCount == 0) {
            return error.badRequest(res, "Email or phone number not existed")
        }
        const compareResult = await bcrypt.compare(password, users.rows[0].user_password)
        if (!compareResult) {
            return error.unauthorized(res, "Email, phone or password incorrect")
        }
        const token = tokenGenerator(users.rows[0].user_id)
        return res.json({ token })
    } catch (err) {
        console.log(err)
        error.internalError(res, err.message)
    }

})

Router.get('/', authorize, async (req, res) => {
    try {
        res.json({ user: req.user })
    } catch (err) {
        error.internalError(res, err.message)
    }
})

module.exports = Router;