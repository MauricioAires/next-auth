import React, { createContext, ReactNode, useContext } from 'react'

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
  function signIn({ email, password }: SignInCredentials) {
    console.log({
      email,
      password
    })

    return true
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: false,
        signIn
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
