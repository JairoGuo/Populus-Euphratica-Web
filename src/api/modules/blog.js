import http from "@/utils/http";
import URLS from "@/api/api-url";

class Blog {
    getArticleList(){
        const url = URLS.BLOG.LIST
        return http.get(url)
    }

    getArticle(articleId) {
        const url = URLS.BLOG.READ + articleId
        return http.get(url)
    }

}

export default new Blog()
