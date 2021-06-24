function validPassword(password) {
    return password.match('/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/')
}

module.exports = validPassword