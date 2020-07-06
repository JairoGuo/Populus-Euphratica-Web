
const ACCOUNT = {
    LIST: 'users/',
    USERS: 'users/',
    STATUS: 'users/login_status/',
    ME: 'users/me/',
    LOGIN: "accounts/login/",
    LOGOUT: "accounts/logout/",
    USER: 'accounts/user/',
    SIGNUP: 'accounts/register/'
}

const USERFOLLOW = {
    CREATE: 'accounts/user-follow/',
    LIST: 'accounts/user-follow/'
}

const USERFANS = {
    LIST: 'accounts/user-fans/'
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
    READ: 'blog/collects/',
    LIST: 'blog/collects/',
    DELETE: 'blog/collects/'
}

const COLLECTCATEGORY = {
    LIST: 'blog/collects-category/',
    READ: 'blog/collects-category/',
    CREATE: 'blog/collects-category/',
    DELETE: 'blog/collects-category/',
    UPDATE: 'blog/collects-category/',
}

const CATEGORYFOLLOW = {
    CREATE: 'blog/category-follow/',
    READ: 'blog/category-follow/',
    LIST: 'blog/category-follow/',

}

const UPLOAD = {
    UPLOAD: 'upload-image/'
}

export default {
    ACCOUNT,
    USERFOLLOW,
    BLOG,
    CATEGORY,
    COMMENT,
    UPLOAD,
    LIKE,
    COLLECT,
    COLLECTCATEGORY,
    CATEGORYFOLLOW,
    USERFANS

}
