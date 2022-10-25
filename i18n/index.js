import { createI18n } from 'vue-i18n';

// 引入需要语言包也可是js文件，export default抛出语言包的对象
import cn from './lang/zh-CN';

//获取本地选择的语言
const i18n = new createI18n({
    locale: 'zh-CN', // 语言标识
    messages: {
        "zh-CN": cn
    }
})

export default i18n;