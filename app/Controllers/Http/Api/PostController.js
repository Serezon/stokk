'use strict'

const File = use('App/Models/File')
const ModelController = use('App/Controllers/Http/Api/ModelController')
const Post = use('App/Models/Post')

class PostController extends ModelController {
  constructor () {
    super(Post)
  }

  async getData ({ request, response }) {
    this.request = request
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const orderBy = request.input('orderBy', 'id')
    const order = request.input('order', 'asc')
    const q = request.input('q', '')

    const models = await Post.query()
      .with('category')
      .with('img')
      .whereRaw(`title LIKE '%${q}%'`)
      .orderBy(orderBy, order)
      .paginate(page, limit)

    this.setContentRangeHeader(response, models.pages, 'posts')
    return response.json(models)
  }

  async get ({ response, params }) {
    const model = await Post
      .query()
      .with('category')
      .with('img')
      .where('id', params.id)
      .first()
    return response.json({ model: await this.prepareModel(model) })
  }

  async create ({ request, response, auth }) {
    const formData = request.only(Post.getFormDataList())
    const user = await auth.getUser()
    formData.created_by = user.id
    const file = new File()
    const image = await file.saveFile(request.file('image', {
      types: ['image'],
      size: '50mb'
    }), user.id)
    formData.image = image || formData.image
    const created = await Post.create(formData)
    const model = await Post
      .query()
      .with('category')
      .with('img')
      .where('id', created.id)
      .first()
    return response.json({ model: await this.prepareModel(model) })
  }

  async update ({ request, response, params }) {
    const formData = request.only(Post.getFormDataList())
    const model = await Post.find(params.id)
    const file = new File()
    if (model) {
      const image = await file.saveFile(request.file('image', {
        types: ['image'],
        size: '50mb'
      }), model.created_by)
      formData.image = image || model.image
      for (const key of Object.keys(formData)) {
        model[key] = formData[key]
      }
      await model.save()
    }
    const res = await Post
      .query()
      .with('category')
      .with('img')
      .where('id', params.id)
      .first()
    return response.json({ model: await this.prepareModel(res) })
  }

  async delete ({ params, response }) {
    const model = await Post.find(params.id)
    await model.delete()
    return response.json({ model: await this.prepareModel(model) })
  }
}

module.exports = PostController
