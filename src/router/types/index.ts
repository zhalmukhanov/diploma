import { RouteRecordRaw } from 'vue-router'

export interface IParser {
    getRoutes(): Array<RouteRecordRaw>
}

export type PathFilePaired = unknown | undefined;

export type GlobResult = Record<string, () => Promise<unknown>>