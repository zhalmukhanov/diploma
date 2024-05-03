import {RouteRecordRaw} from "vue-router"

export default [
    {
        path: '/bonuses',
        component: () => import ('./BonusesPage.vue')
    }

] as RouteRecordRaw[]