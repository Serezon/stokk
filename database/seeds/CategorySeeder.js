'use strict'

const Category = use('App/Models/Category')

class CategorySeeder {
  async run () {
    const categories = [
      'animals',
      'space',
      'sport',
      'paint',
      'it',
      'books',
      'nature'
    ]

    for (const category of categories) {
      await Category.create({
        title: category
      })
    }
  }
}

module.exports = CategorySeeder
