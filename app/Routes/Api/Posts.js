'use strict'

module.exports = Route => {
  Route.get('posts', 'Api/PostController.getData').middleware('auth')
  Route.get('posts/:id', 'Api/PostController.get').middleware('auth')
  Route.post('posts', 'Api/PostController.create').middleware('auth').validator('Post')
  Route.put('posts/:id', 'Api/PostController.update').middleware('auth').validator('Post')
  Route.delete('posts/:id', 'Api/PostController.delete').middleware('auth')
  Route.delete('posts', 'Api/PostController.deleteMany').middleware('auth')
}
