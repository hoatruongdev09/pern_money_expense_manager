const Router = require('express').Router()
const db = require('../db')
const error = require('../errors/error')

const authorize = require('../middlewares/authorize')

Router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const user = await db.query("SELECT * FROM users WHERE user_id=$1", [id])
        if (user.rows.length == 0) {
            return error.notFound(res, "User not found")
        }
        return res.json(user.rows[0])
    } catch (err) {
        error.internalError(res, err.message)
    }
})


module.exports = Router