import Vue from 'vue'
import VueI18n from "vue-i18n"

import zh_CN from "@/assets/lang/config/zh-CN.json"
import en_US from "@/assets/lang/config/en-US.json"
import zh_HK from "@/assets/lang/config/zh-HK.json"
import zh_TW from "@/assets/lang/config/zh-TW.json"
import ru_RU from "@/assets/lang/config/ru-RU.json"
import fr_FR from "@/assets/lang/config/fr-FR.json"
import ja_JP from "@/assets/lang/config/ja-JP.json"
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
