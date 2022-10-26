import { v4 as uuid } from 'uuid'

type SignInRequestData = {
  email: string
  password: string
}

export async function signInRequest(data: SignInRequestData) {
  // Adicionar aqui validações de acesso ao banco

  return {
    token: uuid(),
    user: {
      name: 'Germano Benini',
      email: 'germano_benini@hotmail.com'
    }
  }
}

export async function recoverUserInformation() {
  return {
    user: {
      name: 'Germano Benini',
      email: 'germano_benini@hotmail.com'
    }
  }
}
