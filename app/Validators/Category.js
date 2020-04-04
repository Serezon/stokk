'use strict'

class CategoryValidator {
  get rules () {
    return {
      title: 'required'
    }
  }
}

module.exports = CategoryValidator
