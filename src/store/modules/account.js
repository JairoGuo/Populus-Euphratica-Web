import {ACCOUNT} from '@/store/types'
import loading from '@/utils/loading'
import auth from '@/utils/auth'
// import { createVuexAlong } from 'vuex-along'
import api from '@/api'

const state = {

    // [ACCOUNT.LOG_STATUS]: false,
    // [ACCOUNT.LOG_IN_USERNAME]: '',
    // [ACCOUNT.USER_INFO]: {},
    // [ACCOUNT.CURRENT_USERNAME]: '',
    // [ACCOUNT.DEFAULT_AVATAR]: require("@/assets/images/default-avatar.png"),
    // [ACCOUNT.IS_USER_INFO_EDITING]: {
    //     Archives: false,
    //     Skill: false,
    //     WorkInfo: false,
    // },
    // [ACCOUNT.EDIT_TYPE]: {
    //     Archives: 'Archives',
    //     Skill: 'Skill',
    //     WorkInfo: 'WorkInfo'
    // }
    logStatus: false,
    loginUsername: '',
    userInfo: {},
    currentUsername: '',
    defaultAvatar: require("@/assets/images/default-avatar.png"),
    isUserInfoEditing: {
        Archives: false,
        Skill: false,
        WorkInfo: false,
    },
    editType: {
        Archives: 'Archives',
        Skill: 'Skill',
        WorkInfo: 'WorkInfo'
    }


}

const getters = {
    [ACCOUNT.GET_IS_LOG_IN]: (state) => {
        return state.loginUsername === state.currentUsername
    }
}

const actions = {

    [ACCOUNT.GO_LOG_STATUS]({commit}) {
        api.account.logStatus().then((res) => {

            commit(ACCOUNT.SET_LOG_STATUS, res.data.status)
        })

    },

    [ACCOUNT.GO_LOG_IN]({commit, dispatch, state}, formData) {
        api.account.logIn(formData).then(res => {
            const user = res.data.user
            const access_token = res.data.access_token
            const refresh_token = res.data.refresh_token
            auth.setUserToken(user, access_token, refresh_token)
            commit(ACCOUNT.SET_LOGIN_USERNAME, res.data.user.username)
            dispatch(ACCOUNT.GO_LOG_STATUS)
            dispatch(ACCOUNT.GO_USER_INFO, state.loginUsername)
        })
    },

    [ACCOUNT.GO_LOG_OUT]({commit, dispatch}) {
        api.account.logOut().then(() => {
            auth.clearUserToken()
            dispatch(ACCOUNT.GO_LOG_STATUS)
            commit(ACCOUNT.SET_LOG_STATUS, false)
        }).catch(error => {
            console.log(error)
        })
    },

    [ACCOUNT.GO_USER_INFO]({commit}, user_id) {
        loading.show()
        api.account.getUser(user_id).then((res) => {
            commit(ACCOUNT.SET_USER_INFO, res.data)
            commit(ACCOUNT.SET_CURRENT_USERNAME, res.data.username)
            document.title = res.data.username
            loading.hide()

        }).catch(()=>{
            loading.hide()

        })
    },
    [ACCOUNT.GO_UPDATE_USERINFO]({commit, state}, formData) {
        api.account.updateUserInfo(state.loginUsername, formData).then((res)=>{
            commit(ACCOUNT.SET_USER_INFO, res.data)

        })
    }

}

const mutations = {
    [ACCOUNT.SET_LOG_STATUS](state, status) {

        state.logStatus = status

    },
    [ACCOUNT.SET_LOGIN_USERNAME](state, username) {
        state.loginUsername = username
    },
    [ACCOUNT.SET_USER_INFO](state, userinfo) {
        state.userInfo = userinfo
    },
    [ACCOUNT.SET_CURRENT_USERNAME](state, username) {
        state.currentUsername = username
    },
    [ACCOUNT.SET_USERINFO_EDIT_STATUS](state, key) {
        state.isUserInfoEditing[key] = !state.isUserInfoEditing[key]

    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
    // plugins
}
