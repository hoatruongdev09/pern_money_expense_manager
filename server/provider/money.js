
const db = require('../db')

const listDetailExpense = async (is_admin, user_id, startDate, endDate) => {
    if (endDate == null) { endDate = Math.floor(new Date() / 1000) }
    if (startDate == null) { startDate = endDate }
    try {
        if (is_admin) {
            const moneys = await db.query("SELECT * FROM money_expense_detail WHERE date_created>=to_timestamp($1) AND date_created<=to_timestamp($2) ORDER BY date_created desc", [startDate, endDate]);
            return moneys.rows
        }
        const moneys = await db.query(
            "SELECT * FROM money_expense_detail WHERE user_id=$1 date_created>=to_timestamp($2) AND date_created<=to_timestamp($3) ORDER BY date_created desc",
            [user_id, startDate, endDate]
        );
        return moneys.rows
    } catch (err) {
        throw err
    }
}
const listExpenseMethod = async () => {
    try {
        const methods = await db.query("SELECT * FROM expense_method")
        return methods.rows
    } catch (err) {
        throw err
    }
}
const listExpenseType = async () => {
    try {
        const types = await db.query("SELECT * FROM expense_type")
        return types.rows
    } catch (err) {
        throw err
    }
}

const deleteRecord = async (id, is_admin, user_id) => {
    try {
        if (is_admin) {
            const deletedCategory = await db.query(
                "DELETE FROM money_expense WHERE id=$1",
                [id]
            );
            return deletedCategory.rowCount
        }
        const deletedCategory = await db.query(
            "DELETE FROM money_expense WHERE id=$1 AND user_id=$2",
            [id, user_id]
        );
        return deletedCategory.rowCount
    } catch (err) {
        throw err
    }
}
const createRecord = async (user_id, expense_type_id, category_id, money_amount, note, detail, method, date_created) => {

    try {
        const money = await db.query(
            "INSERT INTO money_expense(expense_type_id,user_id,category_id,money_amount,note,detail, date_created, method) VALUES($1,$2,$3,$4,$5,$6, to_timestamp($7),$8) RETURNING*;",
            [
                expense_type_id,
                user_id,
                category_id,
                money_amount,
                note,
                detail,
                date_created,
                method,
            ]
        );

        return money.rows[0]
    } catch (error) {
        throw err
    }

}
const updateRecord = async (is_admin, user_id, id, expense_type_id, category_id, money_amount, note, detail, method, date_created) => {
    try {
        if (is_admin) {
            const updatedMoney = await db.query(
                "UPDATE money_expense SET expense_type_id=$1,category_id=$2,money_amount=$3,note=$4,detail=$5,method=$7,date_created=to_timestamp($8) WHERE id=$6",
                [expense_type_id, category_id, money_amount, note, detail, id, method, date_created]
            );
            return updatedMoney.rowCount
        }
        const updatedMoney = await db.query(
            "UPDATE money_expense SET expense_type_id=$1,category_id=$2,money_amount=$3,note=$4,detail=$5,method=$8,date_created=to_timestamp($9) WHERE id=$6 AND user_id=$7",
            [
                expense_type_id,
                category_id,
                money_amount,
                note,
                detail,
                id,
                user_id,
                method,
                date_created
            ]
        );
        return updatedMoney.rowCount
    } catch (error) {
        throw error
    }

}
module.exports = { updateRecord, createRecord, deleteRecord, listDetailExpense, listExpenseMethod, listExpenseType }