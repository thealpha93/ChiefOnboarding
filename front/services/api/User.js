import Cookies from 'js-cookie'

export default (axios, store) => ({
  logout (payload) {
    return axios.get('api/logout').then((response) => {
      return true
    }).catch((error) => {
      return Promise.reject(error.response.data)
    })
  },
  changePassword (payload) {
    return axios.post('api/auth/password/change', payload).then((response) => {
      return true
    }).catch(function (error) {
      return Promise.reject(error.response.data)
    })
  },
  login (payload) {
    return axios.post('api/auth/login', payload, { withCredentials: true }).then((response) => {
      console.log(response)
      const csrftoken = Cookies.get('csrftoken')
      console.log('here inside the post', csrftoken)
      axios.defaults.headers.common['x-csrftoken'] = csrftoken
      return response.data
    }).catch((error) => {
      return Promise.reject(error.response.data)
    })
  },
  requestPass (email) {
    return axios.post('api/auth/password/reset', email)
  },
  confirmPass (payload) {
    return axios.post('api/auth/password/reset/confirm', payload).then((response) => {
      return response.data
    }).catch((error) => {
      return Promise.reject(error.response.data)
    })
  },
  seenUpdates () {
    return axios.post('api/users/admin/seen_updates').then((response) => {
      return response.data
    }).catch((error) => {
      return Promise.reject(error.response.data)
    })
  },
  getTOTPQR () {
    return axios.get('api/users/admin/get_totp_qr').then((response) => {
      return response.data
    }).catch((error) => {
      return Promise.reject(error.response.data)
    })
  },
  validateTOTP (payload) {
    return axios.post('api/users/admin/validate_totp', { 'otp': payload }).then((response) => {
      return response.data
    }).catch((error) => {
      return Promise.reject(error.response.data)
    })
  },
  changeLanguage (payload) {
    return axios.post('api/users/admin/language', { 'language': payload }).then((response) => {
      return response.data
    }).catch((error) => {
      return Promise.reject(error.response.data)
    })
  },
  getCSRFToken () {
    return axios.get('api/org/CSRF_token').then((response) => {
      return true
    //   axios.defaults.headers.common['x-csrftoken'] = Cookies.get('csrftoken')
    }).catch((error) => {
      return Promise.reject(error.response.data)
    })
  }
})
