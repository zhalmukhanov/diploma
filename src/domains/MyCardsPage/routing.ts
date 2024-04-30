import {RouteRecordRaw} from "vue-router"

export default [
    {
        path: '/my-cards',
        component: () => import ('./MyCardsPage.vue')
    },
    {
        path: '/add-card',
        component: () => import ('./AddCardPage.vue')
    }
] as RouteRecordRaw[]