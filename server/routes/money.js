const Router = require("express").Router();
const error = require("../errors/error");
const db = require("../db");

const authorize = require("../middlewares/authorize");

const moneyProvider = require('../provider/money')

Router.get("/types", async (req, res) => {
    try {
        return res.json(await moneyProvider.listExpenseType())
    } catch (err) {
        error.internalError(res, err.message);
    }
})

Router.get("/methods", async (req, res) => {
    try {
        return res.json(await moneyProvider.listExpenseMethod())
    } catch (err) {
        error.internalError(res, err.message);
    }
})

Router.get("/", authorize, async (req, res) => {
    try {
        const { startDate, endDate } = req.query
        return res.json(await moneyProvider.listDetailExpense(req.user.is_admin, req.user.user_id, startDate ?? null, endDate ?? null))
    } catch (err) {
        console.log(err)
        error.internalError(res, err.message);
    }
});

Router.get("/:id", authorize, async (req, res) => {
    try {
        const id = req.params.id;
        if (req.user.is_admin) {
            const moneys = await db.query("SELECT * FROM money_expense WHERE id=$1", [
                id,
            ]);
            if (moneys.rowCount == 0) {
                return error.notFound(res, "Record not found");
            }
            res.json(moneys.rows[0]);
        }
        const user_id = req.user.user_id;
        const moneys = await db.query(
            "SELECT * FROM money_expense WHERE user_id=$1 AND id=$2",
            [user_id, id]
        );
        if (moneys.rowCount == 0) {
            return error.notFound(res, "Record not found");
        }
        res.json(moneys.rows[0]);
    } catch (err) {
        error.internalError(res, err.message);
    }
});

Router.post("/", authorize, async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const {
            expense_type_id,
            category_id,
            money_amount,
            note,
            detail,
            method,
            date_created
        } = req.body;
        return res.json(await moneyProvider.createRecord(user_id, expense_type_id, category_id, money_amount, note, detail, method, date_created))
    } catch (err) {
        error.internalError(res, err.message);
    }
});

Router.delete("/:id", authorize, async (req, res) => {
    try {
        return res.json(await moneyProvider.deleteRecord(req.params.id, req.user.is_admin, req.user.user_id))
    } catch (err) {
        error.internalError(res, err.message);
    }
});
Router.put("/:id", authorize, async (req, res) => {
    try {
        const id = req.params.id;
        const {
            expense_type_id,
            category_id,
            money_amount,
            note,
            detail,
            method,
            date_created
        } = req.body;
        return res.json(await moneyProvider.updateRecord(req.user.is_admin, req.user.user_id, id, expense_type_id, category_id, money_amount, note, detail, method, date_created))
    } catch (err) {
        error.internalError(res, err.message);
    }
});

module.exports = Router;
