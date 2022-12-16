import axios from 'axios'
import { parseCookies } from 'nookies'

const { 'redisputing.token': token } = parseCookies()

export const api = axios.create({
  // baseURL: 'http://localhost:5000'
  baseURL: 'https://redisputing.herokuapp.com/'
})

// TODO: Verificar se a '/' ao final vai dar problema
export const apiAuth = axios.create({
  baseURL: 'https://redisputing.herokuapp.com/api/users/'
  // baseURL: 'http://localhost:5000/api/users/'
})

export const apiCNPJ = axios.create({
  baseURL: 'https://publica.cnpj.ws/cnpj/'
})

export const apiCNPJInt = axios.create({
  baseURL: 'https://redisputing.herokuapp.com/api/registerClient'
  // baseURL: 'http://localhost:5000/api/registerClient/'
})

// apiAuth.interceptors.request.use(config => {
//   console.log(config)

//   return config
// })

if (token) {
  api.defaults.headers['Authorization'] = `Bearer ${token}`
  apiAuth.defaults.headers['Authorization'] = `Bearer ${token}`
}
