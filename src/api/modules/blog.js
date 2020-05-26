import http from "@/utils/http";
import URLS from "@/api/api-url";

class Blog {
    getArticleAllList(){
        const url = URLS.BLOG.LIST
        return http.get(url)
    }

    getArticleParamList(params) {
        const url = URLS.BLOG.LIST
        return http.get(url, {params: params})

    }

    getArticle(articleId) {
        const url = URLS.BLOG.READ + articleId
        return http.get(url)
    }

    postArticle(postData) {
        const url = URLS.BLOG.CREATE
        return http.post(url, postData)
    }

}

export default new Blog()
