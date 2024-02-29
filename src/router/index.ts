/* eslint-disable */
import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import {useParser} from './parser'

const parser = await useParser()
const allRoutes = parser.getRoutes()

const routes: RouteRecordRaw[] = [
    {
      path: '',
      redirect: '/main'
    },
    ...allRoutes
]

const index = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})



export default index
