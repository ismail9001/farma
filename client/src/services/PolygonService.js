import Api from '../services/Api'

export default {
  get () {
    return Api().get('polygons')
  },
  post (polygon) {
    return Api().post('polygon', polygon)
  },
  put (polygon) {
    return Api().put(`polygon/${polygon.uuid}`, polygon)
  },
  delete (polygonUuid) {
    return Api().delete(`polygon/${polygonUuid}`)
  }
}
