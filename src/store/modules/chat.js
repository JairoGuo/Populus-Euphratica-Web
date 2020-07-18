import {CHAT} from '@/store/types'

const state = {
    receiver: '',
    receiverId: '',
    receiverInfo: {}

}

const getters = {


}

const actions = {


}

const mutations = {

    [CHAT.SET_RECEIVER](state, username) {
        state.receiver = username
    },

    [CHAT.SET_RECEIVER_ID](state, userId) {
        state.receiverId = userId
    },

    [CHAT.SET_RECEIVER_INFO](state, userInfo) {
        state.receiverInfo = userInfo
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
