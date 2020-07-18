const ACCOUNT = {
    // STATE
    LOG_STATUS: 'logStatus',
    LOG_IN_USERNAME: 'loginUsername',
    LOG_IN_USER_ID: 'loginUserId',
    USER_INFO: 'userInfo',
    CURRENT_USERNAME: 'currentUsername',
    CURRENT_USER_ID: 'currentUserId',
    DEFAULT_AVATAR: 'defaultAvatar',
    IS_USER_INFO_EDITING: 'isUserInfoEditing',
    EDIT_TYPE: 'editType',
    IS_FOLLOW: 'isFollow',

    // ACTION
    GO_LOG_STATUS: 'LogStatus',
    GO_LOG_IN: 'logIn',
    GO_LOG_OUT: 'logOut',
    GO_USER_INFO: 'userInfo',
    GO_UPDATE_USERINFO: 'updateUserInfo',

    // MUTATION
    SET_LOG_STATUS: 'setLogStatus',
    SET_LOGIN_USERNAME: 'setLogInUser',
    SET_LOGIN_USER_ID: 'setLogInUserId',
    SET_USER_INFO: 'setUserInfo',
    SET_CURRENT_USERNAME: 'setCurrentUser',
    SET_CURRENT_USER_ID: 'setCurrentUserId',
    SET_USERINFO_EDIT_STATUS: 'setUserInfoEditStatus',
    SET_IS_FOLLOW: 'setIsFollow',

    // GETTER
    GET_IS_LOG_IN: 'getIsLogIn'
}

const BLOG = {}

const CHAT = {
    // MUTATION
    SET_RECEIVER: 'setReceiver',
    SET_RECEIVER_ID: 'setReceiverId',
    SET_RECEIVER_INFO: 'setReceiverInfo',

}

export {
    ACCOUNT,
    BLOG,
    CHAT
}
