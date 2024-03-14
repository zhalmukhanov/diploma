/* eslint-disable */
import { RouteRecordRaw, createRouter, createWebHistory  } from 'vue-router'
import {useParser} from './parser'

const parser = await useParser()
const allRoutes = parser.getRoutes()

const routes: RouteRecordRaw[] = [
    {
      path: '',
      redirect: '/hello'
    },
    ...allRoutes
]


const index = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})



export default index
