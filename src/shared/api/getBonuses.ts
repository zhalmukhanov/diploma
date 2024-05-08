import { useRequests } from '@/shared/composable'
import type { AxiosResponse } from '@/shared/composable/requests'


export async function getBonuses (): Promise<AxiosResponse<unknown>> {
    const { get } = useRequests()

    const response = get<unknown, unknown>({
        url: 'bonuses',
        body: {},
        loader: 'bonuses'
    })
    return response
}