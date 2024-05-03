/* eslint-disable */
import { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from '@ionic/vue-router';
import {useParser} from './parser'

const parser = await useParser()
const allRoutes = parser.getRoutes()

const routes: Array<RouteRecordRaw> = [
    {
      path: '/',
      redirect: '/hello'
    },
    ...allRoutes
]




const index = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})



export default index
