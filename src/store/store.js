// // import Vue from "vue"
// // import Vuex from "vuex"
// // import createVuexAlong from 'vuex-along'
//
// // Vue.use(Vuex)
//
// const store = new Vuex.Store({
//     state: {
//
//         loginStatus: null,
//         users: {},
//         default_img: require("../assets/images/default-avatar.png"),
//         isEditArchives: false,
//         isEditSkill: false,
//         isEditWorkInfo: false,
//         loginInfo: {
//             username: null,
//
//         },
//         isEditor: false
//
//     },
//     mutations: {
//
//         setloginStatus(state, msg) {
//             state.loginStatus = msg
//         },
//         setUsers(state, msg) {
//             state.users = msg
//         },
//         switchEditArchives(state) {
//             state.isEditArchives = !state.isEditArchives
//         },
//         switchEditSkill(state) {
//             state.isEditSkill = !state.isEditSkill
//         },
//         switchWorkInfo(state) {
//             state.isEditWorkInfo = !state.isEditWorkInfo
//         },
//         setLoginInfo(state, msg) {
//             state.loginInfo.username = msg
//         },
//         setEditor(state) {
//             state.isEditor = !state.isEditor
//         }
//     },
//     plugins: [
//         createVuexAlong({
//             // 设置保存的集合名字，避免同站点下的多项目数据冲突
//             name: "vuex-along",
//             local: {
//                 list: ["starus"],
//                 // 过滤模块 ma 数据， 将其他的存入 localStorage
//                 isFilter: true,
//             },
//             session: {
//                 // 保存模块 ma 中的 a1 到 sessionStorage
//                 list: ["starus.loginStatus"],
//             },
//         }),
//     ],
//
// })
//
// export default store
