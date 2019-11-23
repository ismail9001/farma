import axios from 'axios'
import store from '../store/index'

export default () => {
  return axios.create({
    // baseURL: 'http://134.209.199.218/api/v1/',
    baseURL: 'http://localhost:8081/',
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
