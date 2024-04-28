import {RouteRecordRaw} from "vue-router"

export default [
    {
        path: '/edit-profile',
        component: () => import ('./EditProfilePage.vue')
    }

] as RouteRecordRaw[]