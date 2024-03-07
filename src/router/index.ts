import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import home from '@/views/home/index.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: home,
        meta: {
            title: `${import.meta.env.VITE_APP_TITLE}`
        }
    }
]
const router = createRouter({
    // history 模式的实现。hash模式:createWebHashHistory()
    history: createWebHistory(),
    routes
})

export default router
