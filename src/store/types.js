const ACCOUNT = {
    // STATE
    LOG_STATUS: 'logStatus',
    LOG_IN_USERNAME: 'loginUsername',
    USER_INFO: 'userInfo',
    CURRENT_USERNAME: 'currentUsername',
    DEFAULT_AVATAR: 'defaultAvatar',
    IS_USER_INFO_EDITING: 'isUserInfoEditing',
    EDIT_TYPE: 'editType',

    // ACTION
    GO_LOG_STATUS: 'LogStatus',
    GO_LOG_IN: 'logIn',
    GO_LOG_OUT: 'logOut',
    GO_USER_INFO: 'userInfo',
    GO_UPDATE_USERINFO: 'updateUserInfo',

    // MUTATION
    SET_LOG_STATUS: 'setLogStatus',
    SET_LOGIN_USERNAME: 'setLogInUser',
    SET_USER_INFO: 'setUserInfo',
    SET_CURRENT_USERNAME: 'setCurrentUser',
    SET_USERINFO_EDIT_STATUS: 'setUserInfoEditStatus',

    // GETTER
    GET_IS_LOG_IN: 'getIsLogIn'
}

export {
    ACCOUNT
}
