import env from 'react-dotenv'

class AuthApi {
    constructor() {
        this.host = env.HOST_URL
    }
    async login(emailOrPhone, password) {
        const body = { email: emailOrPhone, password: password }
        try {
            const response = await fetch(`${this.host}/auth/login`, {
                method: "POST",
                body: JSON.stringify(body)
            })
            const parsedResponse = await response.json()
            return parsedResponse
        } catch (error) {
            throw error
        }
    }
    async authenticate(token) {
        try {
            const response = await fetch(`${this.host}/auth`, {
                method: "GET",
                headers: { token: token }
            })
            const parsedResponse = await response.json()
            return parsedResponse
        } catch (error) {
            throw error
        }
    }
}

export default AuthApi