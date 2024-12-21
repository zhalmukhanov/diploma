/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEncrypt } from '@/shared/composable'

const ID_TOKEN_KEY = 'accessToken' as string
const TOKEN_EXPIRES_IN = 'expiresIn' as string
const TOKEN_TYPE = 'tokenType' as string

export const useToken = () => {
  const getToken = (): string | null => {
    const token = window.localStorage.getItem(ID_TOKEN_KEY)
    const expiration = window.localStorage.getItem(TOKEN_EXPIRES_IN)
    const typeIs = window.localStorage.getItem(TOKEN_TYPE)

    if (!token || !expiration) return null
    // if (Date.now() > parseInt(expiration) * 1000) return null

    return typeIs + ' ' + token
  }

  const hasToken = (): boolean => {
    const token = window.localStorage.getItem(ID_TOKEN_KEY)
    const expiration = window.localStorage.getItem(TOKEN_EXPIRES_IN)

    if (!token || !expiration) { return false }

    return true
  }

  const setToken = (token: string): void => {
    window.localStorage.setItem(ID_TOKEN_KEY, token)
  }

  const setTokenDetails = (token: any): void => {
    for (const key in token) {
      window.localStorage.setItem(key, token[key] as any)
    }
  }

  const setTokensEncrypted = (token: any): void => {
    const { encrypt } = useEncrypt()
    window.localStorage.setItem('sensitive', encrypt(token) || '')
  }

  const destroyToken = (): void => {
    window.localStorage.removeItem(ID_TOKEN_KEY)
    window.localStorage.removeItem(TOKEN_EXPIRES_IN)
    window.localStorage.removeItem(TOKEN_TYPE)
  }

  const getYear = (): number => {
    const year = window.localStorage.getItem('year')

    return year
      ? parseInt(year)
      : new Date().getFullYear()
  }

  const getTerm = (): number => {
    const term = window.localStorage.getItem('term')

    if (!term) {
      return new Date().getMonth() < 6 ? 1 : new Date().getMonth() < 9 ? 3 : 2
    }

    return parseInt(term)
  }

  const clearTokens = (): void => {
    window.localStorage.clear()
    window.location.replace('/auth/sign-in')
  }

  const isExpired = () => {
    let isTokenExpired = false

    const token = window.localStorage.getItem(ID_TOKEN_KEY)
    const expiration = window.localStorage.getItem(TOKEN_EXPIRES_IN)

    if (!token || !expiration) isTokenExpired = true
    if (expiration && (Date.now() > parseInt(expiration) * 1000)) isTokenExpired = true

    return isTokenExpired
  }

  return {
    ID_TOKEN_KEY,
    TOKEN_EXPIRES_IN,
    TOKEN_TYPE,
    getToken,
    setToken,
    getYear,
    getTerm,
    setTokenDetails,
    setTokensEncrypted,
    hasToken,
    destroyToken,
    clearTokens,
    isExpired
  }
}

export default useToken
