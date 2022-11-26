import React, { createContext, ReactNode, useContext, useState } from 'react'
import Router from 'next/router'
import { api } from '../../services/api'

type User = {
  email: string
  permissions: string[]
  roles: string[]
}

export type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  signIn(data: any): any
  isAuthenticated: boolean
}

export const AuthContext = createContext({} as AuthContextData)

interface AuthProviderProps {
  children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)

  const isAuthenticated = false

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/sessions', { email, password })

      const { permissions, roles } = response.data

      setUser({
        email,
        permissions,
        roles
      })

      Router.push('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        signIn
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
