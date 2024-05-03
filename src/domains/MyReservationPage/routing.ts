import {RouteRecordRaw} from "vue-router"

export default [
    {
        path: '/my-reservation',
        component: () => import ('./MyReservationPage.vue')
    },
    {
        path: '/extend-reservation/:id',
        component: () => import ('./ExtendReservationPage.vue')
    }

] as RouteRecordRaw[]