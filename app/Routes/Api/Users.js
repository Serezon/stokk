'use strict'

module.exports = Route => {
  Route.get('users', 'Api/UserController.getData').middleware('auth')
  Route.get('users/:id', 'Api/UserController.get').middleware('auth')
  Route.post('users', 'Api/UserController.create').middleware('auth').validator('UserValidator')
  Route.put('users/:id', 'Api/UserController.update').middleware('auth').validator('UserValidator')
  Route.delete('users/:id', 'Api/UserController.delete').middleware('auth')
  Route.delete('users', 'Api/UserController.deleteMany').middleware('auth')
}
