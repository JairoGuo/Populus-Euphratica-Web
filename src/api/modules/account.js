import http from "@/utils/http";
import URLS from "@/api/api-url";

class Account {

    logIn(data) {
        console.log(data)

        const url = URLS.ACCOUNT.LOGIN
        return http.post(url, data)
    }

    logOut() {
        const url = URLS.ACCOUNT.LOGOUT
        return http.post(url)
    }

    getUsers() {
        const url = URLS.ACCOUNT.LIST
        return http.get(url)
    }

    getUser(username) {
        const url = URLS.ACCOUNT.USERS + username
        return http.get(url)

    }

    logStatus() {
        const url = URLS.ACCOUNT.STATUS
        return http.get(url)
    }

    getMe() {
        const url = URLS.ACCOUNT.ME
        return http.get(url)
    }

    updateUserInfo(username, data) {
        const url = URLS.ACCOUNT.USERS + username + '/'
        return http.patch(url, data)
    }


}

export default new Account()
