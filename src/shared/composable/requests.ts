import { useLoader, useToken } from '@/shared/composable'
import { handleOptions, keysToCamel, useShadow } from '@/shared/utils'

export type AxiosResponse<T> = {
  ok: boolean;
  status: number;
  message: string;
  data: T;
}

export type RequestMethodOptionsConfigs = {
  token?: boolean;
  analytics?: boolean;
  loader?: boolean;
}

export type RequestMethodOptions<T> = {
  url: string;
  body: T;
  headers?: Record<string, string>;
  configs?: RequestMethodOptionsConfigs;
  loader?: string;
  camelize?: boolean;
}

type RequestMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'

const requestOptions = {
  token: true,
  analytics: true,
  loader: true
}

export const useRequests = () => {
  const vue = useShadow()

  const setHeaders = (headers: Record<string, string>) => {
    const locale = localStorage.getItem('locale')
    vue.axios.defaults.headers.common['Content-Language'] = locale !== null ? locale : 'en-EN'

    for (let [k, v] of Object.entries(headers)) {
      if (v === null || v === undefined) {
        v = ''
      }
      vue.axios.defaults.headers.common[k] = v
    }
  }

  const setToken = () => {
    const token = useToken().getToken()
    console.log('token', token)
    vue.axios.defaults.headers.common.Authorization = token
  }

  const unsetToken = () => {
    vue.axios.defaults.headers.common.Authorization = ''
  }

  const slugable = (slugObject: Record<string, unknown>): string => {
    let slug = ''

    for (let [k, v] of Object.entries(slugObject)) {
      if (v === null || v === undefined) {
        v = ''
      }
      slug += k + '=' + v + '&'
    }

    return slug.slice(0, -1)
  }

  const makeRequest = async <T, K>(method: RequestMethod, options: RequestMethodOptions<T>): Promise<Awaited<AxiosResponse<K>>> => {
    const { activate, deactivate } = useLoader()
    const configs: RequestMethodOptionsConfigs = handleOptions<RequestMethodOptionsConfigs>(options.configs, requestOptions)
    const camelize = options.camelize !== undefined ? options.camelize : false

    setHeaders(options.headers || {})
    configs.token ? setToken() : unsetToken()
    if (configs.loader && options.loader) activate(options.loader)

    let requestResponse = {}

    const response = await vue.axios[method](options.url, options.body).catch((error) => {
      if (error.response === undefined) {
        requestResponse = {
          ok: false,
          status: 500,
          message: 'Server Request Timeout (code: ERR_CONNECTION_TIMED_OUT)',
          data: []
        }
      } else {
        requestResponse = {
          ok: false,
          status: error.response.status,
          message: error.response.data.message,
          data: []
        }
      }
    }).finally(() => {
      if (configs.loader && options.loader) deactivate(options.loader)
    })

    if (response !== undefined) {
      requestResponse = {
        ok: response !== undefined,
        status: response !== undefined ? response.status : false,
        message: response !== undefined ? response.data.message : false,
        data: response !== undefined ? (camelize ? keysToCamel(response.data) : response.data) : []
      }
    }

    return requestResponse as Awaited<AxiosResponse<K>>
  }

  const get = async <T, K>(options: RequestMethodOptions<T>): Promise<Awaited<AxiosResponse<K>>> => {
    return makeRequest<T, K>('get', options)
  }

  const post = async <T, K>(options: RequestMethodOptions<T>): Promise<Awaited<AxiosResponse<K>>> => {
    return makeRequest<T, K>('post', options)
  }

  const put = async <T, K>(options: RequestMethodOptions<T>): Promise<Awaited<AxiosResponse<K>>> => {
    return makeRequest<T, K>('put', options)
  }

  const patch = async <T, K>(options: RequestMethodOptions<T>): Promise<Awaited<AxiosResponse<K>>> => {
    return makeRequest<T, K>('patch', options)
  }

  const destroy = async <T, K>(options: RequestMethodOptions<T>): Promise<Awaited<AxiosResponse<K>>> => {
    return makeRequest<T, K>('delete', options)
  }

  return {
    get,
    post,
    put,
    patch,
    destroy,
    slugable
  }
}

export default useRequests
