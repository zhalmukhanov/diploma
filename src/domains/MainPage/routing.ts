import {RouteRecordRaw} from "vue-router"

export default {
    path: '/main',
    component: () => import ('./MainPage.vue')
} as RouteRecordRaw