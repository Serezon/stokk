'use strict'

class AuthValidator {
  get rules () {
    return {
      username: 'required',
      password: 'required'
    }
  }

  get messages () {
    return {
      'username.required': 'Username is required',
      'password.required': 'Password is required'
    }
  }
}

module.exports = AuthValidator
