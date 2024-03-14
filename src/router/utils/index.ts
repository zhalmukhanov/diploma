import { RouteRecordRaw } from "vue-router"

export const convertToRoute = (file: unknown): Array<RouteRecordRaw> => {
    if (Array.isArray(file)) return file as Array<RouteRecordRaw>
    return [file] as Array<RouteRecordRaw>
}