import {RouteRecordRaw} from "vue-router"

export default [
    {
        path: '/settings',
        component: () => import ('./SettingsPage.vue')
    }

] as RouteRecordRaw[]