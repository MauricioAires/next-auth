import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import Router from 'next/router'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { api } from '../../services/apiClient'

export type User = {
  email: string
  permissions: string[]
  roles: string[]
}

export type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  signIn: (data: SignInCredentials) => Promise<void>
  signOut: () => void
  user: User | undefined
  isAuthenticated: boolean
}

export const AuthContext = createContext({} as AuthContextData)

let authChannel: BroadcastChannel

export function signOut() {
  destroyCookie(undefined, 'nextauth.token')
  destroyCookie(undefined, 'nextauth.refreshtoken')

  authChannel.postMessage('signOut')

  Router.push('/')
}

interface AuthProviderProps {
  children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  let isAuthenticated = !!user

  useEffect(() => {
    authChannel = new BroadcastChannel('auth')

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          Router.push('/')
          break

        case 'signIn':
          Router.push('/dashboard')
          break

        default:
          break
      }
    }
  }, [])

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()

    if (token) {
      api
        .get('/me')
        .then((response) => {
          setUser(response.data)
        })
        .catch(() => {
          signOut()
        })
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/sessions', { email, password })

      const { token, refreshToken, permissions, roles } = response.data

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 dias
        path: '/'
      })

      setCookie(undefined, 'nextauth.refreshtoken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 dias
        path: '/'
      })

      /**
       * @description locais para armazenar dados temposrairo
       *
       * sessionStorage
       * localStorage
       * cookie
       */

      setUser({
        email,
        permissions,
        roles
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      Router.push('/dashboard')
      authChannel.postMessage('signIn')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        user,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
