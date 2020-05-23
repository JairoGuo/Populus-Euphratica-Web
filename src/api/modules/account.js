import http from "@/utils/http";
import URLS from "@/api/api-url";
class Account {

    logIn(params) {
        console.log(params)

        const url = URLS.ACCOUNT.LOGIN
        return http.post(url,params)
    }

    logOut() {
        const url = URLS.ACCOUNT.LOGOUT
        return http.post(url)
    }

    getUsers() {
        const url = URLS.ACCOUNT.LIST
        return http.get(url)
    }

    getUser(params) {
        const url = URLS.ACCOUNT.USERS + params
        return http.get(url)

    }

    logStatus(){
        const url = URLS.ACCOUNT.STATUS
        return http.get(url)
    }

    getMe() {
        const url = URLS.ACCOUNT.ME
        return http.get(url)
    }


}

export default new Account()
