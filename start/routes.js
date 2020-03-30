'use strict'

const Route = use('Route')
const Auth = use('App/Routes/Api/Auth')
const Posts = use('App/Routes/Api/Posts')
const Categories = use('App/Routes/Api/Categories')
const Users = use('App/Routes/Api/Users')
const Files = use('App/Routes/Api/Files')

Route.group(() => {
  Auth(Route)
  Posts(Route)
  Categories(Route)
  Users(Route)
  Files(Route)
}).prefix('/api')
Route.get('/uploads/:filename', 'Api/FileController.getByFilename')
Route.on('*', () => 'Hello world!')
