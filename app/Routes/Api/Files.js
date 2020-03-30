module.exports = Route => {
  Route.get('files/:id', 'Api/FileController.get')
  Route.post('files', 'Api/FileController.upload').middleware('auth')
  Route.delete('files/:id', 'Api/FileController.delete').middleware('auth')
}
