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
//
//   // login(params){
//   //   const url = "/cms/login"
//   //   return this.http.post(url,params)
//   // }
//   //
//   // getMerchants(page=1){
//   //   const url = "/cms/merchant?page="+page
//   //   return this.http.get(url)
//   // }
//   //
//   // addMerchant(data){
//   //   const url = "/cms/merchant"
//   //   return this.http.post(url,data)
//   // }
//   //
//   // getMerchant(merchant_id){
//   //   const url = "/cms/merchant/" + merchant_id
//   //   return this.http.get(url)
//   // }
//   //
//   // updateMerchant(merchant_id,data){
//   //   const url = "/cms/merchant/" + merchant_id
//   //   return this.http.put(url,data)
//   // }
//   //
//   // getCategories(merchant_id){
//   //   const url = "/cms/category/merchant/"+merchant_id
//   //   return this.http.get(url)
//   // }
//   //
//   // updateCategory(category_id,data){
//   //   const url = "/cms/category/" + category_id
//   //   return this.http.put(url,data)
//   // }
//   //
//   // addCategory(data){
//   //   const url = "/cms/category"
//   //   return this.http.post(url,data)
//   // }
//   //
//   // deleteCategory(category_id){
//   //   const url = "/cms/category/" + category_id
//   //   return this.http.delete(url)
//   // }
//   //
//   // addGoods(data){
//   //   const url = "/cms/goods"
//   //   return this.http.post(url,data)
//   // }
// }
const http = axios.create({
      baseURL: BASE_URL,
      timeout: 1000
    });
export default http
