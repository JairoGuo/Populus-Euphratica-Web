import {ACCOUNT} from '@/store/mutation-types'
import load from '@/utils/loading'
// import { createVuexAlong } from 'vuex-along'
import api from '@/api'

const state = {
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
    getIsLogIn: (state) => {
        return state.loginUsername === state.currentUsername
    }
}

const actions = {

    setLogStatus({commit}) {
        api.account.logStatus().then((res) => {
            console.log(res)
            commit(ACCOUNT.SET_LOG_STATUS, res.data.status)
        })

    },

    logIn({commit, dispatch, state}, formData) {
        api.account.logIn(formData).then(res => {
            commit(ACCOUNT.SET_LOGIN_USERNAME, res.data.user.username)
            dispatch('setLogStatus')
            dispatch('userInfo', state.loginUsername)
        })
    },

    logOut({commit, dispatch}) {
        api.account.logOut().then(() => {
            dispatch('setLogStatus')
            // this.logStatus({commit})
            commit(ACCOUNT.SET_LOG_STATUS, false)
        }).catch(error => {
            console.log(error)
        })
    },

    userInfo({commit}, user_id) {
        load.show()
        api.account.getUser(user_id).then((res) => {
            commit(ACCOUNT.SET_USER_INFO, res.data)
            commit(ACCOUNT.SET_CURRENT_USERNAME, res.data.username)
            load.hide()

        })
    }
}

const mutations = {
    [ACCOUNT.SET_LOG_STATUS](state, status) {

        state.logStatus = status
        console.log(state.logStatus)
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

// const plugins = [
//     createVuexAlong({
//         // 设置保存的集合名字，避免同站点下的多项目数据冲突
//         name: "vuex-along",
//         local: {
//             list: ["starus"],
//             // 过滤模块 ma 数据， 将其他的存入 localStorage
//             isFilter: true,
//         },
//         session: {
//             // 保存模块 ma 中的 a1 到 sessionStorage
//             list: ["starus.logStatus"],
//         },
//     }),
// ]


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
    // plugins
}
