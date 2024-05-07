/* eslint-disable */
import { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from '@ionic/vue-router';

const routes: Array<RouteRecordRaw> = [
    {
      path: '/',
      redirect: '/hello'
    },
    {
        path: '/hello',
        component: () => import ('../domains/Authentication/HelloPage/HelloPage.vue')
    },
    {
        path: '/login',
        component: () => import ('../domains/Authentication/LoginPage/LoginPage.vue')
    },
    {
        path: '/register',
        component: () => import ('../domains/Authentication/RegisterPage/RegisterPage.vue')
    },
    {
        path: '/reset-password/step-1',
        component: () => import ('../domains/Authentication/ResetPasswordPage/ResetPasswordPage.vue')
    },
    {
        path: '/reset-password/step-2',
        component: () => import ('../domains/Authentication/ResetPasswordPage/ResetPasswordStep2Page.vue')
    },
    {
        path: '/bonuses',
        component: () => import ('../domains/BonusesPage/BonusesPage.vue')
    },
    {
        path: '/edit-profile',
        component: () => import ('../domains/EditProfilePage/EditProfilePage.vue')
    },
    {
        path: '/main',
        component: () => import ('../domains/MainPage/MainPage.vue')
    },
    {
        path: '/my-cards',
        component: () => import ('../domains/MyCardsPage/MyCardsPage.vue')
    },
    {
        path: '/add-card',
        component: () => import ('../domains/MyCardsPage/AddCardPage.vue')
    },
    {
        path: '/my-reservation',
        component: () => import ('../domains/MyReservationPage/MyReservationPage.vue')
    },
    {
        path: '/extend-reservation/:id',
        component: () => import ('../domains/MyReservationPage/ExtendReservationPage.vue')
    },
    {
        path: '/my-vehicles',
        component: () => import ('../domains/MyVehiclesPage/MyVehiclesPage.vue')
    },
    {
        path: '/add-vehicle',
        component: () => import ('../domains/MyVehiclesPage/AddVehiclePage.vue')
    },
    {
        path: '/reservation',
        component: () => import ('../domains/ReservationPage/ReservationPage.vue')
    },
    {
        path: '/settings',
        component: () => import ('../domains/SettingsPage/SettingsPage.vue')
    },
    {
        path: '/support',
        component: () => import ('../domains/SupportPage/SupportPage.vue')
    },
    {
        path: '/faq/:id',
        component: () => import ('../domains/SupportPage/FaqPage.vue')
    },
    {
        path: '/contact',
        component: () => import ('../domains/SupportPage/ContactPage.vue')
    }
]




const index = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})



export default index
