'use strict'

class RegisterValidator {
  get rules () {
    return {
      username: 'required|unique:users',
      password: 'required|min:6|max:30',
      first_name: 'required',
      last_name: 'required'
    }
  }

  get messages () {
    return {
      'username.required': 'Username is required',
      'username.unique': 'User with this username already exists',
      'password.required': 'Password is required',
      'password.min': 'Password should be at least 6 characters long',
      'password.max': 'Password should be shorter than 30 characters',
      'first_name.required': 'First name is required',
      'last_name.required': 'Last name is required'
    }
  }
}

module.exports = RegisterValidator
