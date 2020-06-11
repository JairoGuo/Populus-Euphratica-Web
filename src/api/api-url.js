
const ACCOUNT = {
    LIST: 'users/',
    USERS: 'users/',
    STATUS: 'users/login_status/',
    ME: 'users/me/',
    LOGIN: "accounts/login/",
    LOGOUT: "accounts/logout/",
    USER: 'accounts/user/'
}


const BLOG = {
    LIST: 'blog/articles-list/',
    READ: 'blog/articles/',
    CREATE: 'blog/articles/',
    UPDATE: 'blog/articles/',
    DELETE: 'blog/articles/'
}

const CATEGORY = {
    LIST: 'blog/category/',
    READ: 'blog/category/',
    CREATE: 'blog/category/',
    DELETE: 'blog/category/',
    UPDATE: 'blog/category/'
}

const COMMENT = {

    CREATE: 'blog/comments/'
}

const LIKE = {

    CREATE: 'blog/likes/'
}

const COLLECT = {
    CREATE: 'blog/collects/',
    READ: 'blog/collects/'
}

const COLLECTCATEGORY = {
    LIST: 'blog/collects-category/',
    CREATE: 'blog/collects-category/'
}

const UPLOAD = {
    UPLOAD: 'upload-image/'
}

export default {
    ACCOUNT,
    BLOG,
    CATEGORY,
    COMMENT,
    UPLOAD,
    LIKE,
    COLLECT,
    COLLECTCATEGORY

}
