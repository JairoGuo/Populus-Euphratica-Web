import URLS from "@/api/api-url";
import http from "@/utils/http";

class Chat {

    sendMessage(postData) {
        const url = URLS.CHAT.CREATE
        return http.post(url, postData)
    }

    getMessages(receiver) {
        const url = URLS.CHAT.LIST
        return http.get(url, {params: {receiver: receiver}})
    }

}

export default new Chat()
