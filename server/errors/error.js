const notFound = (res, message) => {
    return res.status(404).json({ message: message })
}
const badRequest = (res, message) => {
    return res.status(400).json({ message: message })
}
const unauthorized = (res, message) => {
    return res.status(401).json({ message: message })
}
const internalError = (res, message) => {
    return res.status(500).json({ message: message })
}

module.exports = {
    notFound,
    badRequest,
    unauthorized,
    internalError
}