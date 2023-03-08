import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import axios from './http'
import VueAxios from "vue-axios";

const app = createApp(App)

// 全局挂载axios
app.config.globalProperties.$axios = axios

/**
 * 测试环境下 引入自定义的mockRequest
 * 因为mockRequest不是默认导出的：export default{}
 * 所以引入时需要加大括号，这种可以引入多个
 */
if (process.env.NODE_ENV === 'development') {
    const {mockRequest} = require('@/mock')
    mockRequest()
}

app.use(VueAxios, axios);

app.use(router)

app.use(ElementPlus)
app.mount('#app')

