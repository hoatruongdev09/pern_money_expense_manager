const db = require('../db')

const listDetailExpense = async (is_admin, user_id) => {
    try {
        if (is_admin) {
            const moneys = await db.query("SELECT * FROM money_expense_detail ORDER BY date_created desc");
            return moneys.rows
        }
        const moneys = await db.query(
            "SELECT * FROM money_expense_detail WHERE user_id=$1 ORDER BY date_created desc",
            [user_id]
        );
        return moneys.rows
    } catch (err) {
        throw err
    }
}
const listExpenseMethod = async () => {
    try {
        const methods = await db.query("SELECT * FROM expense_method")
        return methods.row
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
module.exports = { listDetailExpense, listExpenseMethod, listExpenseType }