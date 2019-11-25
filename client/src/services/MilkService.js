import Api from '../services/Api'

export default {
  get () {
    return Api().get('milk')
  },
  post (milk) {
    return Api().post('milk', milk)
  },
  put (milk) {
    console.log(milk)
    return Api().put(`milk/${milk.id}`, milk)
  },
  delete (milkId) {
    return Api().delete(`milk/${milkId}`)
  }
}
