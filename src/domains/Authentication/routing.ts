import {RouteRecordRaw} from "vue-router"

export default [
    {
        path: '/hello',
        component: () => import ('./HelloPage/HelloPage.vue')
    },
    {
        path: '/login',
        component: () => import ('./LoginPage/LoginPage.vue')
    },
    {
        path: '/register',
        component: () => import ('./RegisterPage/RegisterPage.vue')
    },
    {
        path: '/reset-password/step-1',
        component: () => import ('./ResetPasswordPage/ResetPasswordPage.vue')
    },
    {
        path: '/reset-password/step-2',
        component: () => import ('./ResetPasswordPage/ResetPasswordStep2Page.vue')
    }
] as Array<RouteRecordRaw>