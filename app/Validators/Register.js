'use strict'

class RegisterValidator {
  get rules () {
    return {
      username: 'required|unique:users',
      password: 'required',
      first_name: 'required',
      last_name: 'required'
    }
  }

  get messages () {
    return {
      'username.required': 'Username is required',
      'username.unique': 'User with this username already exists',
      'password.required': 'Password is required',
      'first_name.required': 'First name is required',
      'last_name.required': 'Last name is required'
    }
  }
}

module.exports = RegisterValidator
