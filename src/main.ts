import { createApp } from 'vue'
import router from '@/router/index'
import Antd from 'ant-design-vue'
import App from './App.vue'
import store from './store'
import '../mock'
import 'ant-design-vue/dist/reset.css'

const app = createApp(App)

// 全局属性
// app.config.globalProperties.username = '张三'

app.use(router).use(store).use(Antd).mount('#app')
