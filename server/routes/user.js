const Router = require('express').Router()
const db = require('../db')
const error = require('../errors/error')
const userProvider = require('../provider/user')
const authorize = require('../middlewares/authorize')

Router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const user = await userProvider.getUserInfo(id)
        if (user == null) {
            return error.notFound(res, "User not found")
        }
        return res.json(user.rows[0])
    } catch (err) {
        error.internalError(res, err.message)
    }
})
Router.get('/info/current', authorize, async (req, res) => {
    try {
        const id = req.user.user_id
        const user = await userProvider.getUserInfo(id)
        if (user == null) {
            return error.notFound(res, "User not found")
        }
        const { activated, is_admin, trial_expired, user_address, user_email, user_name, user_phone } = user
        return res.status(200).json({ activated, is_admin, trial_expired, user_address, user_email, user_name, user_phone })
    } catch (err) {
        console.log('err: ', err)
        error.internalError(res, err.message)
    }
})
Router.put('/', authorize, async (req, res) => {
    try {
        const id = req.user.user_id
        {
            let { user_address, user_email, user_name, user_phone } = req.body
            var updateCount = await userProvider.updateUserInfo(id, user_address, user_email, user_name, user_phone)
            if (updateCount.length == 0) {
                return error.notFound(res, "User not found")

            }
        }
        const { activated, is_admin, trial_expired, user_address, user_email, user_name, user_phone } = updateCount[0]
        res.status(200).json({ activated, is_admin, trial_expired, user_address, user_email, user_name, user_phone })
    } catch (err) {
        console.log(err)
        error.internalError(res, err.message)
    }
})
Router.put('/password/update', authorize, async (req, res) => {
    try {
        const id = req.user.user_id
        const { old_password, new_password } = req.body
        console.log('old password: ', old_password)
        const result = await userProvider.updateUserPassword(id, old_password, new_password)
        if (result.length == 0) {
            return error.notFound(res, "User not found")
        }
        const { activated, is_admin, trial_expired, user_address, user_email, user_name, user_phone } = result[0]
        return res.status(200).json({ activated, is_admin, trial_expired, user_address, user_email, user_name, user_phone })
    } catch (err) {
        // console.log(err.message)
        if (err.message === "user_not_found") {
            error.notFound(res, err.message)
        } else if (err.message == "password_not_match") {
            console.log('here')
            error.badRequest(res, err.message)
        } else {
            error.internalError(res, err.message)
        }
    }
})

Router.get('/error/test', (req, res) => {
    res.status(400).json({ message: 'hey' })
})

module.exports = Router