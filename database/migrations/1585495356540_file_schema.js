'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FilesSchema extends Schema {
  up () {
    this.create('files', (table) => {
      table.increments()
      table.string('filename', 254).notNullable()
      table.string('original', 254).notNullable()
      table.bigint('size').unsigned()
      table.string('type', 254)
      table.integer('created_by').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('files')
  }
}

module.exports = FilesSchema
