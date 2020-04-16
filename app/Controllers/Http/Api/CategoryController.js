'use strict'

const ModelController = use('App/Controllers/Http/Api/ModelController')
const Category = use('App/Models/Category')

class CategoryController extends ModelController {
  constructor () {
    super(Category)
  }

  async getData ({ request, response }) {
    this.request = request
    const page = request.input('page', 1)
    const limit = request.input('limit', 3)
    const orderBy = request.input('orderBy', 'id')
    const order = request.input('order', 'asc')
    const filter = request.input('filter', [])
    const q = request.input('q', '')

    let models = Category.query().clone()
    if (filter.length) {
      const queryList = filter.toString().slice(1, -1)
      models = models.whereRaw(`id IN (${queryList})`).clone()
    } else {
      models = models.whereRaw(`title LIKE '%${q}%'`).clone()
    }
    models = await models
      .orderBy(orderBy, order)
      .paginate(page, limit)

    this.setContentRangeHeader(response, models.pages, 'categories')
    return response.json(models)
  }

  async getAll ({ request, response }) {
    this.request = request
    const orderBy = request.input('orderBy', 'id')
    const order = request.input('order', 'asc')
    const filter = request.input('filter', [])
    const q = request.input('q', '')

    let models = Category.query().clone()
    if (filter.length) {
      const queryList = filter.toString().slice(1, -1)
      models = models.whereRaw(`id IN (${queryList})`).clone()
    } else {
      models = models.whereRaw(`title LIKE '%${q}%'`).clone()
    }
    models = await models
      .orderBy(orderBy, order)
      .fetch()

    return response.json(models)
  }

  async get ({ response, params }) {
    const model = await Category.find(params.id)
    return response.json({ model: await this.prepareModel(model) })
  }

  async create ({ request, response, auth }) {
    const formData = request.only(Category.getFormDataList())
    const model = await Category.create(formData)
    return response.json({ model: await this.prepareModel(model) })
  }

  async update ({ request, response, auth, params }) {
    const formData = request.only(Category.getFormDataList())
    const model = await Category.find(params.id)
    if (model) {
      for (const key of Object.keys(formData)) {
        model[key] = formData[key]
      }
      await model.save()
    }
    return response.json({ model: await this.prepareModel(model) })
  }

  async delete ({ params, response }) {
    const model = await Category.find(params.id)
    await model.delete()
    return response.json({ model: await this.prepareModel(model) })
  }
}

module.exports = CategoryController
