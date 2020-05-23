// import createVuexAlong from "vuex-along";
//
// const state = {
//     count: 0,
//
//     users: {},
//
//     isEditArchives: false,
//     isEditSkill: false,
//     isEditWorkInfo: false,
//     loginInfo: {
//         username: null,
//
//     },
//     isEditor: false
//
// }
// const getters = {}
//
// const actions = {}
//
// const mutations = {
//     increment(state) {
//         state.count++
//     },
//     setloginStatus(state, msg) {
//         state.loginStatus = msg
//     },
//     setUsers(state, msg) {
//         state.users = msg
//     },
//     switchEditArchives(state) {
//         state.isEditArchives = !state.isEditArchives
//     },
//     switchEditSkill(state) {
//         state.isEditSkill = !state.isEditSkill
//     },
//     switchWorkInfo(state) {
//         state.isEditWorkInfo = !state.isEditWorkInfo
//     },
//     setLoginInfo(state, msg) {
//         state.loginInfo.username = msg
//     },
//     setEditor(state) {
//         state.isEditor = !state.isEditor
//     }
// }
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
//             list: ["starus.loginStatus"],
//         },
//     }),
// ]
//
// export default {
//     namespaced: true,
//     state,
//     getters,
//     actions,
//     mutations,
//     plugins
//
// }
