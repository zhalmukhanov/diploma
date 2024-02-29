import { RouteRecordRaw } from "vue-router"

export const convertToRoute = (file: unknown): RouteRecordRaw => file as RouteRecordRaw