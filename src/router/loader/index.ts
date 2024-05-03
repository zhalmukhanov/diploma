import { PathFilePaired, GlobResult } from '../types'

export const loadRouteFiles = async (): Promise<PathFilePaired[]> => {
    const files: PathFilePaired[] = []

    const routingFiles: GlobResult = import.meta.glob('@/domains/**/routing.ts')

    for (const path in routingFiles) {
        const module = await import(path).then((i) => i.default)
        files.push(module)
    }

    return files
}
