import Api from '../service/Api'

export default {
  register: function (credentials) {
    return Api().post('register', credentials)
  },
  login: function (credentials) {
    return Api().post('account', credentials)
  }
}

//  AuthenticationService.register({
//  email: 'testing@gmail.com',
//  password: '123456'
//  })
