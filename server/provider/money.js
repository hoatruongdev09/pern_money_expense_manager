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
module.exports = { deleteRecord, listDetailExpense, listExpenseMethod, listExpenseType }