import { createRouter, createWebHistory } from 'vue-router'

// 路由配置信息
const routes = [
    // 重定向
    {
        path:'/',
        redirect:'/login'
    },
    {
        path:'/login',
        name: 'login',
        component:()=>import('../views/login/index.vue')
    },
    {
        path:'/home',
        name: 'home',
        component:()=>import('../views/home/index.vue')
    },
]
const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router