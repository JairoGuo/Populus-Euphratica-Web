import Vue from 'vue'
import VueI18n from "vue-i18n"

import zh_CN from "@/lang/config/zh-CN.json"
import en_US from "@/lang/config/en-US.json"
import zh_HK from "@/lang/config/zh-HK.json"
import zh_TW from "@/lang/config/zh-TW.json"
import ru_RU from "@/lang/config/ru-RU.json"
import fr_FR from "@/lang/config/fr-FR.json"
import ja_JP from "@/lang/config/ja-JP.json"
Vue.use(VueI18n)

const i18n = new VueI18n({

    locale: localStorage.getItem('LACALE') || 'zh_CN',

    messages: {
        zh_CN,
        en_US,
        zh_HK,
        zh_TW,
        ru_RU,
        fr_FR,
        ja_JP
    }

})

export default i18n
