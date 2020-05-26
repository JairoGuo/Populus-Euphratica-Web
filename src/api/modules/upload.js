import http from "@/utils/http";
import URLS from "@/api/api-url";

class Upload {

    uploadImage(postData) {
        const url = URLS.UPLOAD.UPLOAD
        return http.post(url, postData, {headers: {'Content-Type': 'multipart/form-data'}})
    }

}

export default new Upload()
