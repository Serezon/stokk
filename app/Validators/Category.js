'use strict'

class CategoryValidator {
  get rules () {
    return {
      title: 'required'
    }
  }

  get messages () {
    return {
      'title.required': 'Title is required'
    }
  }
}

module.exports = CategoryValidator
