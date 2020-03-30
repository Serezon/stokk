'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostsSchema extends Schema {
  up () {
    this.create('posts', table => {
      table.increments()
      table.integer('category_id').unsigned().references('id').inTable('categories')
      table.string('title')
      table.text('description')
      table.integer('image').unsigned().references('id').inTable('files')
      table.integer('created_by').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostsSchema
