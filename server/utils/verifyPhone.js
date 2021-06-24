function validPhone(phone) {
    return phone.match(/\d/g).length === 10;
}

module.exports = validPhone