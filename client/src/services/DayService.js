import Api from '../services/Api'

export default {
  get () {
    return Api().get('day')
  },
  post (day) {
    return Api().post('day', day)
  },
  put (day) {
    return Api().put(`day/${day.uuid}`, day)
  },
  delete (dayId) {
    return Api().delete(`day/${dayId}`)
  }
}
