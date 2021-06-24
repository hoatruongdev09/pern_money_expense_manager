const notFound = (res, message) => {
    return res.status(404).send({ message: message })
}
const badRequest = (res, message) => {
    return res.status(400).send({ message: message })
}
const unauthorized = (res, message) => {
    return res.status(401).send({ message: message })
}
const internalError = (res, message) => {
    return res.status(500).send({ message: message })
}

module.exports = {
    notFound,
    badRequest,
    unauthorized,
    internalError
}