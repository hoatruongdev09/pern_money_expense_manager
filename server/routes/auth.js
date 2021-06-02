const Router = require('express').Router()
const tokenGenerator = require('../utils/tokenGenerator')
const bcrypt = require('bcrypt')
const error = require('../errors/error')
const db = require('../db')

const validRegisterInfo = require('../middlewares/validRegisterInfo')
const validLoginInfo = require('../middlewares/validLoginInfo')
const authorize = require('../middlewares/authorize')


Router.post('/register', validRegisterInfo, async (req, res) => {
    try {

        const { email, password } = req.body

        const users = await db.query('SELECT * FROM users WHERE user_email=$1', [email])
        if (users.rowCount != 0) {
            return error.unauthorized(res, "Email is not available!");
        }
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);
        const currentDay = new Date()
        const nextMonth = new Date(currentDay.getDate(), currentDay.getMonth() + 1, currentDay.getFullYear())
        const user = await db.query('INSERT INTO users(user_email,user_password,activated,trial_expired,is_admin) VALUES($1,$2,$3,to_timestamp($4),$5) RETURNING*',
            [email, bcryptPassword, false, Math.floor(nextMonth / 1000), false])

        const payload = {
            user_id: user.rows[0].user_id,
            is_admin: false
        }
        const token = tokenGenerator(payload)

        return res.json({ token })
    } catch (err) {
        console.log(err)
        error.internalError(res, err.message)
    }

})

Router.post('/login', validLoginInfo, async (req, res) => {
    const { email, password } = req.body

    try {
        const users = await db.query('SELECT * FROM users WHERE user_email=$1', [email])
        if (users.rowCount == 0) {
            return error.badRequest(res, "Email or phone number not existed")
        }
        console.log(`${password} `)
        const compareResult = await bcrypt.compare(password, users.rows[0].user_password)
        if (!compareResult) {
            return error.unauthorized(res, "Email, phone or password incorrect")
        }
        const payload = {
            user_id: users.rows[0].user_id,
            is_admin: users.rows[0].is_admin,
        }
        const token = tokenGenerator(payload)
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