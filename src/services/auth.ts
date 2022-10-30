import { v4 as uuid } from 'uuid'
import { SignInRequestData, IAuthData, IAuthPut } from '../interfaces'
import { apiAuth } from './api'

export async function signInRequest(data: SignInRequestData) {
  // Adicionar aqui validações de acesso ao banco

  const { email, password } = data

  const { data: response } = await apiAuth.post<IAuthData>('/login', {
    email,
    password
  })

  console.log(response)

  return response
}

export async function registerInRequest(data: SignInRequestData) {
  // Adicionar aqui validações de acesso ao banco

  const { email, password, name } = data

  const { data: response } = await apiAuth.post<IAuthData>('/', {
    email,
    password,
    name
  })

  console.log(response)

  return response
}

export async function recoverUserInformation() {
  const { data: response } = await apiAuth.get<IAuthPut>(`/getProfile`)
  console.log(response)
  return response
}
