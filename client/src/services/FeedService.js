import Api from '../services/Api'

export default {
  get () {
    return Api().get('feeds')
  },
  post (feed) {
    return Api().post('feed', feed)
  },
  put (feed) {
    return Api().put(`feed/${feed.id}`, feed)
  },
  delete (feedId) {
    return Api().delete(`feed/${feedId}`)
  }
}
