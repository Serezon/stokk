'use strict'

const ModelController = use('App/Controllers/Http/Api/ModelController')
const User = use('App/Models/User')

class UserController extends ModelController {
  constructor () {
    super(User)
  }

  async getData ({ request, response }) {
    this.request = request
    const page = request.input('page', 1)
    const limit = request.input('limit', 3)
    const orderBy = request.input('orderBy', 'id')
    const order = request.input('order', 'asc')
    const q = request.input('q', '')

    const models = await User.query()
      .whereRaw(`username LIKE '%${q}%'`)
      .orderBy(orderBy, order)
      .paginate(page, limit)

    this.setContentRangeHeader(response, models.pages, 'users')
    return response.json(models)
  }

  async get ({ response, params }) {
    const model = await User.find(params.id)
    return response.json({ model: await this.prepareModel(model) })
  }

  async create ({ request, response, auth }) {
    const formData = request.only(User.getFormDataList())
    const model = await User.create(formData)
    return response.json({ model: await this.prepareModel(model) })
  }

  async update ({ request, response, auth, params }) {
    const formData = request.only(User.getFormDataList())
    const model = await User.find(params.id)
    if (model) {
      for (const key of Object.keys(formData)) {
        model[key] = formData[key]
      }
      await model.save()
    }
    return response.json({ model: await this.prepareModel(model) })
  }

  async delete ({ params, response }) {
    const model = await User.find(params.id)
    await model.delete()
    return response.json({ model: await this.prepareModel(model) })
  }
}

module.exports = UserController
