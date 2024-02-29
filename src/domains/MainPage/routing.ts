import {RouteRecordRaw} from "vue-router"

export default {
    path: '/main',
    component: () => import ('./FolderPage.vue')
} as RouteRecordRaw