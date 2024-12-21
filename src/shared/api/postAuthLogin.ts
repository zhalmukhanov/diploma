import { useRequests } from '@/shared/composable'
import type { AxiosResponse } from '@/shared/composable/requests'

export type LoginRequest = {
    email: string;
    password: string;
}

export type LoginResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export async function postAuthLogin (body: LoginRequest): Promise<AxiosResponse<LoginResponse>> {
    const { post } = useRequests()

    const response = post<LoginRequest, LoginResponse>({
        url: 'auth/login',
        body,
        configs: { token: false },
        loader: '/1.0.0/sign-in',
        camelize: true
    })
    return response
}