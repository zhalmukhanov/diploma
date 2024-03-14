import { IParser } from './types'

import {RouteRecordRaw} from "vue-router"
import { loadRouteFiles } from './loader'
import { convertToRoute } from './utils'

export const useParser = async (): Promise<IParser> => {
    const routes: Array<RouteRecordRaw> = []

    const load = await loadRouteFiles()
    const files = [ ...load ]

    files.forEach((file) => {
        routes.push(...convertToRoute(file))
    })

    return {
        getRoutes: () => routes,
    }
}
