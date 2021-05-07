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
        return res.json(await moneyProvider.listDetailExpense(req.user.is_admin, req.user.user_id))
    } catch (err) {
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
        const currentDate = Math.floor(Date.now() / 1000);
        const {
            expense_type_id,
            category_id,
            money_amount,
            note,
            detail,
            method,
        } = req.body;
        const money = await db.query(
            "INSERT INTO money_expense(expense_type_id,user_id,category_id,money_amount,note,detail, date_created, method) VALUES($1,$2,$3,$4,$5,$6, to_timestamp($7),$8) RETURNING*;",
            [
                expense_type_id,
                user_id,
                category_id,
                money_amount,
                note,
                detail,
                currentDate,
                method,
            ]
        );

        res.json(money.rows[0]);
    } catch (err) {
        error.internalError(res, err.message);
    }
});

Router.delete("/:id", authorize, async (req, res) => {
    try {
        return res.json(await moneyProvider.deleteRecord(req.params.id, req.user.is_admin, req.user.user_id))
        // if (req.user.is_admin) {
        //     const deletedCategory = await db.query(
        //         "DELETE FROM money_expense WHERE id=$1)",
        //         [req.params.id]
        //     );
        //     return res.json(deletedCategory.rowCount);
        // }
        // const deletedCategory = await db.query(
        //     "DELETE FROM money_expense WHERE id=$1 AND user_id=$2)",
        //     [req.params.id, req.user.user_id]
        // );
        // return res.json(deletedCategory.rowCount);
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
        } = req.body;
        if (req.user.is_admin) {
            const updatedMoney = await db.query(
                "UPDATE money_expense SET expense_type_id=$1,category_id=$2,money_amount=$3,note=$4,detail=$5,method=$7 WHERE id=$6",
                [expense_type_id, category_id, money_amount, note, detail, id, method]
            );
            return res.json(updatedMoney.rowCount);
        }
        const updatedMoney = await db.query(
            "UPDATE money_expense SET expense_type_id=$1,category_id=$2,money_amount=$3,note=$4,detail=$5,method=$8 WHERE id=$6 AND user_id=$7",
            [
                expense_type_id,
                category_id,
                money_amount,
                note,
                detail,
                id,
                req.user.user_id,
                method,
            ]
        );
        return res.json(updatedMoney.rowCount);
    } catch (err) {
        error.internalError(res, err.message);
    }
});

module.exports = Router;
