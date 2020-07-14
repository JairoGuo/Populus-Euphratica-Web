import URLS from "@/api/api-url";
import http from "@/utils/http";

class Chat {

    sendMessage(postData) {
        const url = URLS.CHAT.CREATE
        return http.post(url, postData)
    }

}

export default new Chat()
