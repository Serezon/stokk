'use strict'

class UserValidator {
  get rules () {
    return {
      username: 'required',
      password: 'required'
    }
  }
}

module.exports = UserValidator
