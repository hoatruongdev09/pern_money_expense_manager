const db = require('../db')
const bcrypt = require('bcrypt')
const { filename } = require('../utils/Resize')
const getUserInfo = async (user_id) => {
    try {
        const user = await db.query("SELECT * FROM users WHERE user_id=$1", [user_id])
        if (user.rows.length == 0) {
            return null
        }
        return user.rows[0]
    } catch (error) {
        throw error
    }
}
const updateUserInfo = async (user_id, user_address, user_email, user_name, user_phone) => {
    console.log(user_id)
    console.log(user_address)
    console.log(user_email)
    console.log(user_name)
    console.log(user_phone)
    try {
        const user = await db.query("UPDATE public.users SET user_address=$1, user_email=$2, user_name=$3, user_phone=$4 WHERE user_id=$5 RETURNING *;",
            [user_address ? user_address : '', user_email ? user_email : '', user_name ? user_name : '', user_phone ? user_phone : '', user_id])
        return user.rows
    } catch (error) {
        throw error
    }
}
const updateUserPassword = async (user_id, oldPassword, newPassword) => {
    try {
        const userPassword = await db.query("SELECT user_password FROM users WHERE user_id=$1", [user_id])
        if (userPassword.rows.length == 0) {
            throw Error("user_not_found")
        }
        const compareResult = await bcrypt.compare(oldPassword, userPassword.rows[0].user_password)
        if (!compareResult) {
            throw Error("password_not_match")
        }
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(newPassword, salt);
        const updatedCount = await db.query("UPDATE users SET user_password=$1 WHERE user_id=$2 RETURNING *", [bcryptPassword, user_id])
        return updatedCount.rows
    } catch (error) {
        throw error
    }
}
const updateUserAvatar = async (user_id, filename) => {
    try {
        const updatePassword = await db.query("UPDATE users SET avatar=$1 WHERE user_id=$2 RETURNING *", [filename, user_id])
        return updatePassword.rows
    } catch (error) {
        throw error
    }
}
module.exports = { getUserInfo, updateUserInfo, updateUserPassword, updateUserAvatar }