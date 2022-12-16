import { User } from './IUser'

export interface SignInRequestData {
  email: string
  password: string
  name?: string
}

export interface IAuthData {
  _id: string
  name: string
  email: string
  token?: string
}

export interface AuthContextType {
  isAuthenticated: boolean
  user: User
  signIn: (data: SignInRequestData) => Promise<void>
  registerIn: (data: SignInRequestData) => Promise<void>
}

export interface IAuthPut {
  _id: string
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
  __v: number
}
