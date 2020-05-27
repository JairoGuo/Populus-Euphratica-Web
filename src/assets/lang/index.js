import Vue from 'vue'
import VueI18n from "vue-i18n"

import zh_CN from "@/assets/lang/config/zh-cn"
import en_US from "@/assets/lang/config/en-us"

Vue.use(VueI18n)

const i18n = new VueI18n({

    locale: localStorage.getItem('LACALE') || 'zh_CN',

    messages: {
        zh_CN,
        en_US
    }

})

export default i18n
