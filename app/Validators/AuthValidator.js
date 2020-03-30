'use strict'

class AuthValidator {
  get rules () {
    return {
      username: 'required',
      password: 'required'
    }
  }
}

module.exports = AuthValidator
