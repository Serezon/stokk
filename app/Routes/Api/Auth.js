'use strict'

module.exports = Route => {
  Route.post('auth/login', 'Api/AuthController.login').middleware('guest').validator('AuthValidator')
  Route.post('auth/register', 'Api/AuthController.signUp').middleware('guest').validator('AuthValidator')
  Route.get('auth/current', 'Api/AuthController.current').middleware('auth')
  Route.get('auth/logout', 'Api/AuthController.logout').middleware('auth')
}
