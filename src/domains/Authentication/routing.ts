import {RouteRecordRaw} from "vue-router"

export default {
    path: '/hello',
    component: () => import ('./HelloPage/HelloPage.vue')
} as RouteRecordRaw