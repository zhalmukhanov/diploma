import { useRequests } from '@/shared/composable'
import type { AxiosResponse } from '@/shared/composable/requests'


export async function postAuthLogout (): Promise<AxiosResponse<unknown>> {
    const { post } = useRequests()

    const response = post<unknown, unknown>({
        url: 'auth/logout',
        body: {},
        loader: 'logout',
        camelize: true
    })
    return response
}