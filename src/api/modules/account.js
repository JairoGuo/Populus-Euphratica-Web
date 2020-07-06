import http from "@/utils/http";
import URLS from "@/api/api-url";

class Account {

    logIn(data) {
        const url = URLS.ACCOUNT.LOGIN
        return http.post(url, data)
    }

    logOut() {
        const url = URLS.ACCOUNT.LOGOUT
        return http.post(url)
    }

    signUp(data) {
        const url = URLS.ACCOUNT.SIGNUP
        return http.post(url, data)

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

    createUserFollow(userId) {
        const url = URLS.USERFOLLOW.CREATE
        return http.post(url, {follow_to: userId})

    }

    getFollow(followUserId) {
        const url = URLS.USERFOLLOW.LIST
        return http.get(url, {params: {follow: followUserId}})
    }

    getFans(followUserToId) {
        const url = URLS.USERFANS.LIST
        return http.get(url, {params: {follow_to: followUserToId}})
    }


}

export default new Account()
