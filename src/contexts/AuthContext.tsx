import Router from 'next/router'
import { parseCookies, setCookie } from 'nookies'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../services/api'
import { recoverUserInformation, signInRequest } from '../services/auth'

type AuthContextType = {
  isAuthenticated: boolean
  user: User
  signIn: (data: SignInData) => Promise<void>
}

type SignInData = {
  email: string
  password: string
}

type User = {
  email: string
  name: string
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = !!user

  useEffect(() => {
    const { 'redisputing.token': token } = parseCookies()

    if (token) {
      recoverUserInformation().then(response => setUser(response.user))
    }
  }, [])

  async function signIn({ email, password }: SignInData) {
    const { token, user } = await signInRequest({
      email,
      password
    })

    setCookie(undefined, 'redisputing.token', token, {
      maxAge: 60 * 60 * 1 // 1 hour
    })

    api.defaults.headers['Authorization'] = `Bearer ${token}`

    setUser(user)

    Router.push('/home')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
