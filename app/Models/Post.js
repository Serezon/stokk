'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {
  static get table () {
    return 'posts'
  }

  static getFormDataList () {
    return [
      'category_id',
      'title',
      'description',
      'image'
    ]
  }

  category () {
    return this.belongsTo('App/Models/Category', 'category_id', 'id')
  }

  img () {
    return this.belongsTo('App/Models/File', 'image', 'id')
  }
}

module.exports = Post
