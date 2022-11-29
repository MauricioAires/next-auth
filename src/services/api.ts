import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { GetServerSidePropsContext } from 'next'
import { parseCookies, setCookie } from 'nookies'
import { signOut } from '../contexts/Auth'
import { AuthTokenError } from './errors/AuthTokenError'

let isRefreshing = false
/**
 * todas as requisições que deram falha por causa
 * do token expirado
 */
let failedRequestsQueue: {
  onSuccess: (token: string) => void
  onFailure: (err: AxiosError<unknown, any>) => void
}[] = []

export function setupAPIClient(
  ctx: GetServerSidePropsContext | undefined = undefined
) {
  let cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://localhost:3333/',
    headers: {
      Authorization: `Bearer ${cookies['nextauth.token']}`
    }
  })

  /**
   * @description pausar todas as requisições que estão sendo
   * feitas, até o token está atualizado
   *
   * reezecutar com o novo token
   */
  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if ((error.response.data as any).code === 'token.expired') {
          cookies = parseCookies(ctx)

          const { 'nextauth.refreshtoken': refreshToken } = cookies

          /**
           * @description config tem todas as infomações possiveis
           * para repetir uma requisição, rota, parâmetros
           */
          const originalConfig = error.config as AxiosRequestConfig

          /**
           * evitar que feito duas ou mais solicitações
           * de atualização de token
           */
          if (!isRefreshing) {
            isRefreshing = true

            api
              .post('/refresh', {
                refreshToken
              })
              .then((response) => {
                const { token, refreshToken: newRefreshToken } = response.data

                setCookie(ctx, 'nextauth.token', token, {
                  maxAge: 60 * 60 * 24 * 30, // 30 dias
                  path: '/'
                })

                setCookie(ctx, 'nextauth.refreshtoken', newRefreshToken, {
                  maxAge: 60 * 60 * 24 * 30, // 30 dias
                  path: '/'
                })

                api.defaults.headers['Authorization'] = `Bearer ${token}`

                failedRequestsQueue.forEach((request) =>
                  request.onSuccess(token)
                )
                failedRequestsQueue = []
              })
              .catch((err) => {
                failedRequestsQueue.forEach((request) => request.onFailure(err))
                failedRequestsQueue = []

                if (typeof window !== 'undefined') {
                  signOut()
                } else {
                  return Promise.reject(new AuthTokenError())
                }
              })
              .finally(() => {
                isRefreshing = false
              })
          }

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              // caso o processo de refresh token tenha dado ceto
              onSuccess: (token: string) => {
                originalConfig.headers!['Authorization'] = `Bearer ${token}`

                resolve(api(originalConfig))
              },
              /// refresh token error
              onFailure: (err: AxiosError) => {
                reject(err)
              }
            })
          })
        } else {
          if (typeof window !== 'undefined') {
            signOut()
          } else {
            return Promise.reject(new AuthTokenError()).finally()
          }
        }
      }

      return Promise.reject(error)
    }
  )

  return api
}
