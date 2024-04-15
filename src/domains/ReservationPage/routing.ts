import {RouteRecordRaw} from "vue-router"

export default {
    path: '/reservation',
    component: () => import ('./ReservationPage.vue')
} as RouteRecordRaw