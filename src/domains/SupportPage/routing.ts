import {RouteRecordRaw} from "vue-router"

export default [
    {
        path: '/support',
        component: () => import ('./SupportPage.vue')
    },
    {
        path: '/faq/:id',
        component: () => import ('./FaqPage.vue')
    },
    {
        path: '/contact',
        component: () => import ('./ContactPage.vue')
    }

] as RouteRecordRaw[]