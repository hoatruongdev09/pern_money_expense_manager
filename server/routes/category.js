const db = require('../db')
const Router = require('express').Router()
const authorization = require('../middlewares/authorize')
const lowLevelAuthorization = require('../middlewares/lowLevelAuthorize')
const error = require('../errors/error')

Router.get('/', lowLevelAuthorization, async (req, res) => {
    try {
        if (!req.user) {
            const categories = await db.query('SELECT * FROM category WHERE user_category=FALSE')
            return res.json(categories.rows)
        }
        if (req.user.is_admin) {
            const categories = await db.query('SELECT * FROM category')
            return res.json(categories.rows)
        }
        const categories = await db.query('SELECT * FROM category WHERE user_category=FALSE OR (user_category=TRUE AND user_id=$1)', [req.user.user_id])
        return res.json(categories.rows)
    } catch (err) {
        error.internalError(res, err.message)
    }
})
Router.get('/:id', lowLevelAuthorization, async (req, res) => {
    try {
        const category = await db.query('SELECT * FROM category WHERE id=$1', [req.params.id])
        if (category.rowCount == 0) {
            return error.notFound(res, 'Category not found')
        }
        if (!req.user && category.rows[0].user_category) {
            return error.notFound(res, 'Category not found')
        }
        if (req.user && category.rows[0].user_category && req.user.user_id != category.rows[0].user_id) {
            return error.notFound(res, 'Category not found')
        }
        res.json(category.rows[0])
    } catch (err) {
        error.internalError(res, err.message)
    }
})

Router.post('/', authorization, async (req, res) => {
    try {
        if (req.user.is_admin) {
            const category = await db.query('INSERT INTO category(category_name) VALUES($1) RETURNING*;', [req.body.category_name])
            return res.json(category.rows[0])
        }
        const category = await db.query('INSERT INTO category(category_name,user_category,user_id) VALUES($1,TRUE,$2) RETURNING*;', [req.body.category_name, req.user.user_id])
        return res.json(category.rows[0])
    } catch (err) {
        error.internalError(res, err.message)
    }
})
Router.delete('/:id', authorization, async (req, res) => {
    try {
        if (is_admin) {
            const deletedCategory = await db.query("DELETE FROM category WHERE id=$1", [req.params.id])
            return res.json(deletedCategory.rowCount)
        }
        const deletedCategory = await db.query("DELETE FROM category WHERE id=$1 AND user_id=$2", [req.params.id, req.user.user_id])
        return res.json(deletedCategory.rowCount)
    } catch (err) {
        error.internalError(res, err.message)
    }
})
Router.put('/:id', authorization, async (req, res) => {
    try {
        const id = req.params.id
        const { category_name, user_category, user_id } = req.body
        const is_admin = req.user.is_admin

        if (is_admin) {
            const updatedCategory = await db.query("UPDATE category SET category_name=$1,user_category=$2,user_id=$3 WHERE id=$4", [category_name, user_category, user_id, id])
            return res.json(updatedCategory.rowCount)
        }
        const updatedCategory = await db.query("UPDATE category SET category_name=$1, WHERE id=$4 AND user_id=$2", [id, user_id])
        return res.json(updatedCategory.rowCount)

    } catch (err) {
        error.internalError(res, err.message)
    }
})
module.exports = Router