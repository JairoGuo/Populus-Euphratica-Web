import axios from "axios"
import auth from "@/utils/auth"
import router from "@/router"
import message from "@/utils/message";
import {mapMutations} from "vuex";
import {ACCOUNT} from "@/store/types";


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
      console.log(err.response)
    if(err.response.status === 401) {
        auth.clearUserToken()
        mapMutations('account', ACCOUNT.SET_LOG_STATUS, false)
        router.replace("/login")

    } else if(err.message.includes('timeout')){
        message.error('请求超时，请稍后再试')

        return Promise.reject(err);
    } else {
        message.error('网络连接失败，请稍后再试')
        return Promise.reject(err)
    }

    })

export default http
