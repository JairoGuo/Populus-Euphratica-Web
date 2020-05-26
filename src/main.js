import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElemantUI from 'element-ui'
import SuiVue from 'semantic-ui-vue'
import JsCookies from 'js-cookie'
import VueI18n from 'vue-i18n'
import Moment from "moment";
import mavonEditor from 'mavon-editor'

import 'element-ui/lib/theme-chalk/index.css'
import '../node_modules/semantic-ui-css/semantic.min.css'
import 'mavon-editor/dist/css/index.css'
// import 'semantic-ui-css/semantic.min.css'


import api from '@/api'
import store from "@/store"
import loading from "@/utils/loading"
import message from "@/utils/message"
import auth from "@/utils/auth"

Vue.use(JsCookies)

Vue.use(SuiVue);
Vue.use(ElemantUI)
Vue.use(VueAxios, axios)
Vue.use(Moment)
Vue.use(mavonEditor)
Vue.use(VueI18n)
// Vue.use(Timeago)

Vue.prototype.$api = api
Vue.prototype.$loading = loading
Vue.prototype.$message = message
Vue.prototype.$auth = auth
Vue.config.productionTip = false

new Vue({

    router,
    store,
    render: h => h(App)
}).$mount('#app')
