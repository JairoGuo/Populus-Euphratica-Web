const USER_KEY = "USER_KEY"
const ACCESS_TOKEN = "ACCESS_TOKEN"
const REFRESH_TOKEN = 'REFRESH_TOKEN'
class Auth {
    constructor() {
        this.token = null
        this.user = null
        this.token = localStorage.getItem(ACCESS_TOKEN)
        const userJson = localStorage.getItem(USER_KEY)
        if (userJson) {
            this.user = JSON.parse(userJson)
        }
    }

    static getInstance() {
        if (!this._instance) {
            this._instance = new Auth()
        }
        return this._instance
    }

    setUserToken(user, access_token, refresh_token) {
        this.user = user
        this.token = access_token
        localStorage.setItem(USER_KEY, JSON.stringify(user))
        localStorage.setItem(ACCESS_TOKEN, access_token)
        localStorage.setItem(REFRESH_TOKEN, refresh_token)
    }

    clearUserToken() {
        this.user = null;
        this.token = null;
        localStorage.removeItem(USER_KEY)
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(REFRESH_TOKEN)
    }

    get is_authed() {
        return !!(this.user && this.token);
    }
}


export default Auth.getInstance()

