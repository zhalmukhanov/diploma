import {RouteRecordRaw} from "vue-router"

export default [
    {
        path: '/my-vehicles',
        component: () => import ('./MyVehiclesPage.vue')
    },
    {
        path: '/add-vehicle',
        component: () => import ('./AddVehiclePage.vue')
    }
] as RouteRecordRaw[]