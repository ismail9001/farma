import axios from 'axios'
import store from '../store/index'

export default () => {
  return axios.create({
    // baseURL: 'http://142.93.141.53:8081/',
    baseURL: 'http://localhost:8081/',
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
