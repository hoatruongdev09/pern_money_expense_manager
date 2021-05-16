const db = require('../db')

const listCategories = async (isAuthorized, isAdmin, userID) => {
    try {
        if (!isAuthorized) {
            const categories = await db.query(
                "SELECT * FROM category WHERE user_category=FALSE"
            );
            return categories.rows.map(cat => {
                return {
                    ...cat,
                    canDelete: isAdmin || cat.user_category
                }
            });
        }
        if (isAdmin) {
            const categories = await db.query("SELECT * FROM category");
            return categories.rows.map(cat => {
                return {
                    ...cat,
                    canDelete: isAdmin || cat.user_category
                }
            });
        }
        const categories = await db.query(
            "SELECT * FROM category WHERE user_category=FALSE OR (user_category=TRUE AND user_id=$1)",
            [userID]
        );
        return categories.rows.map(cat => {
            return {
                ...cat,
                canDelete: isAdmin || cat.user_category
            }
        });
    } catch (err) {
        throw err;
    }
};
const getCategory = async (isAuthorized, userID, id) => {
    try {
        const category = await db.query("SELECT * FROM category WHERE id=$1", [id]);
        if (category.rowCount == 0) {
            return null;
        }
        if (!isAuthorized && category.rows[0].user_category) {
            return null;
        }
        if (
            isAuthorized &&
            category.rows[0].user_category &&
            userID != category.rows[0].user_id
        ) {
            return null;
        }
        return category.rows[0];
    } catch (err) {
        throw err;
    }
};
const createCategory = async (isAdmin, category_name, expense_type_id, user_id) => {
    try {
        if (isAdmin) {
            const category = await db.query(
                "INSERT INTO category(category_name,expense_type_id) VALUES($1,$2) RETURNING*;",
                [category_name, expense_type_id]
            );
            return category.rows[0];
        }
        const category = await db.query(
            "INSERT INTO category(category_name,expense_type_id,user_category,user_id) VALUES($1,$2,TRUE,$3) RETURNING*;",
            [category_name, expense_type_id, user_id]
        );
        return category.rows[0];
    } catch (err) {
        throw err;
    }
};
const deleteCategory = async (is_admin, user_id, id) => {
    try {
        if (is_admin) {
            const deletedCategory = await db.query(
                "DELETE FROM category WHERE id=$1",
                [id]
            );
            return deletedCategory.rowCount;
        }
        const deletedCategory = await db.query(
            "DELETE FROM category WHERE id=$1 AND user_id=$2",
            [id, user_id]
        );
        return deletedCategory.rowCount;
    } catch (err) {
        throw err;
    }
};

const updateCategory = async (is_admin, user_id, id, category_name, expense_type_id, user_category) => {
    try {
        if (is_admin) {
            const updatedCategory = await db.query(
                "UPDATE category SET category_name=$1,expense_type_id=$2,user_category=$3,user_id=$4 WHERE id=$5",
                [category_name, expense_type_id, user_category, user_id, id]
            );
            return updatedCategory.rowCount;
        }
        const updatedCategory = await db.query(
            "UPDATE category SET category_name=$1,expense_type_id=$2, WHERE id=$3 AND user_id=$4",
            [category_name, expense_type_id, id, user_id]
        );
        return updatedCategory.rowCount;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    getCategory, listCategories,
    deleteCategory, updateCategory, createCategory
}
