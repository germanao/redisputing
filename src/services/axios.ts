import axios from 'axios'
import { parseCookies } from 'nookies'

const { 'redisputing.token': token } = parseCookies()

export const api = axios.create({
  baseURL: 'http://localhost:5000'
})

if (token) {
  api.defaults.headers['Authorization'] = `Bearer ${token}`
}
