import {RouteRecordRaw} from "vue-router"

export default [
    {
        path: '/hello',
        component: () => import ('./HelloPage/HelloPage.vue')
    },
    {
        path: '/login',
        component: () => import ('./LoginPage/LoginPage.vue')
    }
] as Array<RouteRecordRaw>