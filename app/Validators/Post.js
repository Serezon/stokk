'use strict'

class PostValidator {
  get rules () {
    return {
      category_id: 'required|integer',
      title: 'required',
      image: 'required'
    }
  }

  get messages () {
    return {
      'category_id.required': 'Category is required',
      'category_id.integer': 'Category is not a number',
      'title.required': 'Title is required',
      'image.required': 'Image is required'
    }
  }
}

module.exports = PostValidator
