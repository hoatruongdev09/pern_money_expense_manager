const baseUrl = `http://localhost:5000`



const createRequest = (path, options) => {
    return fetch(`${baseUrl}${path}`, options)
}
export { baseUrl, createRequest }