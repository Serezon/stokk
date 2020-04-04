'use strict'

module.exports = Route => {
  Route.post('auth/login', 'Api/AuthController.login').middleware('guest').validator('Auth')
  Route.post('auth/register', 'Api/AuthController.signUp').middleware('guest').validator('Register')
}
