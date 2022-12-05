import Router from 'next/router'
import { parseCookies, setCookie } from 'nookies'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { AuthContextType, IAuthData, SignInRequestData } from '../interfaces'
import { User } from '../interfaces/IUser'
import { api, apiAuth } from '../services/api'
import {
  recoverUserInformation,
  registerInRequest,
  signInRequest
} from '../services/auth'

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  const [user, setUser] = useState<IAuthData>(null)

  const isAuthenticated = !!user
  // console.log(isAuthenticated)
  // console.log(user)

  useEffect(() => {
    const getInfo = async () => {
      const { ['redisputing.token']: token } = parseCookies()

      if (token) {
        const userData = await recoverUserInformation()
        if (userData) {
          const userDTO: IAuthData = {
            _id: userData._id,
            name: userData.name,
            email: userData.email
          }

          setUser(userDTO)
        }
      }
    }
    // if (token) {
    //   const data = recoverUserInformation(user?._id)
    //   console.log(data)
    // } else {
    //   console.log('Não entrouy')
    // }
    getInfo()
  }, [])

  async function signIn({ email, password }: SignInRequestData) {
    const userData = await signInRequest({
      email,
      password
    })

    setCookie(undefined, 'redisputing.token', userData.token, {
      maxAge: 60 * 360 * 1 // 1 hour
    })

    api.defaults.headers['Authorization'] = `Bearer ${userData.token}`
    apiAuth.defaults.headers['Authorization'] = `Bearer ${userData.token}`

    setUser(userData)

    Router.back()
  }

  async function registerIn({ email, password, name }: SignInRequestData) {
    await registerInRequest({
      email,
      password,
      name
    })

    await signIn({ email, password })
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, registerIn }}>
      {children}
    </AuthContext.Provider>
  )
}
