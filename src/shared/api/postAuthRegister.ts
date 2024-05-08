import { useRequests } from '@/shared/composable'
import type { AxiosResponse } from '@/shared/composable/requests'

export type RegisterRequest = {
   name: string;
    phone: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export async function postAuthRegister (body: RegisterRequest): Promise<AxiosResponse<unknown>> {
    const { post } = useRequests()

    const response = post<RegisterRequest, unknown>({
        url: 'auth/register',
        body,
        configs: { token: false },
        loader: 'register',
        camelize: true
    })
    return response
}