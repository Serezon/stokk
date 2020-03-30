'use strict'

class PostValidator {
  get rules () {
    return {
      category_id: 'required|integer',
      title: 'required',
      image: 'required'
    }
  }
}

module.exports = PostValidator
