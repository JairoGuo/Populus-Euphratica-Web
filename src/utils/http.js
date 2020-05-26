import axios from "axios"
import auth from "@/utils/auth"
// import router from "../routes"

const BASE_URL = 'api/'


const http = axios.create({
      baseURL: BASE_URL,
      timeout: 5000
    })

http.interceptors.request.use(config => {
    const token = auth.token
      if(token){
        config.headers.common.Authorization = "JWT " + token
      }
      return config

})


http.interceptors.response.use(response => {
      return response
    },err => {
      // auth.clearUserToken()
      // router.replace("/login")
      console.log(err.response)
      console.log("==========")
      return Promise.reject(err)
    })

export default http
