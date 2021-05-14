const db = require('../db')
const Router = require('express').Router()
const authorization = require('../middlewares/authorize')
const lowLevelAuthorization = require('../middlewares/lowLevelAuthorize')
const error = require('../errors/error')

const categoryProvider = require('../provider/category')

Router.get('/', lowLevelAuthorization, async (req, res) => {
    try {
        res.json(await categoryProvider.listCategories(!req.user, req.user.is_admin, req.user.user_id))
    } catch (err) {
        error.internalError(res, err.message)
    }
})
Router.get('/:id', lowLevelAuthorization, async (req, res) => {
    try {
        return res.json(await categoryProvider.getCategory(req.user, req.user.user_id, req.params.id))
    } catch (err) {
        error.internalError(res, err.message)
    }
})

Router.post('/', authorization, async (req, res) => {
    try {
        const { category_name, expense_type_id } = req.body
        return res.json(await categoryProvider.createCategory(req.user.is_admin, category_name, expense_type_id, req.user.user_id))
    } catch (err) {
        error.internalError(res, err.message)
    }
})
Router.delete('/:id', authorization, async (req, res) => {
    try {
        return res.json(await categoryProvider.deleteCategory(req.user.is_admin, req.user.user_id, req.params.id))
    } catch (err) {
        error.internalError(res, err.message)
    }
})
Router.put('/:id', authorization, async (req, res) => {
    try {
        const id = req.params.id
        const { category_name, user_category, user_id } = req.body
        const is_admin = req.user.is_admin

        return res.json(await categoryProvider.updateCategory(is_admin, req.user.user_id, id, category_name, user_category))

    } catch (err) {
        error.internalError(res, err.message)
    }
})
module.exports = Router