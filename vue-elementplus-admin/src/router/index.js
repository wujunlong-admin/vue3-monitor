import {createRouter, createWebHistory} from 'vue-router'


// 路由配置信息
const routes = [
    // 重定向
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login/Login.vue')
    },
    {
        path: '/login1',
        name: 'login1',
        component: () => import('../views/Login1/Login1.vue')
    },
    {
        path: '/index',
        name: 'Index',
        component: () => import('../views/Index/Index.vue')
    },
    {
        path: '/resetpwd',
        name: 'ResetPwd',
        component: () => import('../views/ResetPwd/ResetPwd.vue')
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router