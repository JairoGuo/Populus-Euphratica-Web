import axios from "axios"
// import auth from "./auth"
// import router from "../routes"

const BASE_URL = 'api/'

// class Http {
//   constructor() {
//
//
//     // 请求之前的拦截器，用来设置JWT
//     // this.http.interceptors.request.use(config => {
//     //   const token = auth.token
//     //   if(token){
//     //     config.headers.common.Authorization = "JWT " + token
//     //   }
//     //   return config
//     // })
//
//     // 响应之后的拦截器
//     // this.http.interceptors.response.use(response => {
//     //   return response
//     // },err => {
//     //   // auth.clearUserToken()
//     //   // router.replace("/login")
//     //   console.log(err.response)
//     //   console.log("==========")
//     //   return Promise.reject(err)
//     // })
//   }
// }
const http = axios.create({
      baseURL: BASE_URL,
      timeout: 5000
    });
export default http
