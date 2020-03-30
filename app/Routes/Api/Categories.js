'use strict'

module.exports = Route => {
  Route.get('categories', 'Api/CategoryController.getData').middleware('auth')
  Route.get('categories/:id', 'Api/CategoryController.get').middleware('auth')
  Route.post('categories', 'Api/CategoryController.create').middleware('auth').validator('CategoryValidator')
  Route.put('categories/:id', 'Api/CategoryController.update').middleware('auth').validator('CategoryValidator')
  Route.delete('categories/:id', 'Api/CategoryController.delete').middleware('auth')
  Route.delete('categories', 'Api/CategoryController.deleteMany').middleware('auth')
}
