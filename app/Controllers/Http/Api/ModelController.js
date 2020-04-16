'use strict'

const FAT = use('App/Constants/FilterAttributeTypes')

class ModelController {
  constructor (Model) {
    this.Model = Model
    this.request = {}
    this.formData = {}
  }

  /**
   * Get filtered and sorted list of models
   * @param request
   * @param response
   * @returns {Promise.<void>}
   */
  async getData ({ request, response }) {
    this.request = request
    const page = request.input('page', 0)
    const limit = request.input('limit', 10)
    const query = this.getQuery()
    const usersCount = await query.getCount()
    const models = await query.offset(page * limit)
      .limit(limit)
    response.safeHeader('X-Total-Count', usersCount)
    return response.json(await this.mapModels(models))
  }

  async mapModels (models) {
    const { hidden } = this.Model
    if (hidden && hidden.length > 0) {
      return models.map(model => {
        for (const attr of hidden) {
          delete model[attr]
        }
        return model
      })
    }
    return models
  }

  /**
   * Get filtered and sorted list of options for select
   * @param request
   * @param response
   * @returns {Promise.<void>}
   */
  async all ({ request, response }) {
    this.request = request
    const query = this.getQuery()
    const models = await query
    return response.json(models.reduce((result, model) => ([...result, {
      value: this.Model.getOptionValue(model),
      label: this.Model.getOptionLabel(model)
    }]), []))
  }

  /**
   * Get query object for list of models|options
   * @returns {*}
   */
  getQuery () {
    const { request } = this
    const order = request.input('order', 'desc')
    const sortBy = request.input('sortBy', 'id')

    const tableName = this.Model.table

    const filterAttrs = this.Model.filterConfig
      ? Object.keys(this.Model.filterConfig)
        .reduce((result, attrs) => ([...result, ...this.Model.filterConfig[attrs]]), [])
      : []

    const filter = request.only(filterAttrs)

    const query = this.Model.query()
      .orderBy(`${tableName}.${sortBy}`, order)

    if (filterAttrs.length) {
      for (const type of Object.keys(this.Model.filterConfig)) {
        for (const attr of this.Model.filterConfig[type]) {
          if (filter[attr]) {
            switch (type) {
              case FAT.EQUAL:
                if (filter[attr] === 'null') {
                  query.andWhereRaw(`\`${tableName}\`.\`${attr}\` IS NULL`)
                } else {
                  query.andWhere(`${tableName}.${attr}`, '=', filter[attr])
                }
                break
              case FAT.EQUAL_OPTION:
                if (JSON.parse(filter[attr]).value) {
                  query.andWhere(`${tableName}.${attr}`, '=', JSON.parse(filter[attr]).value)
                }
                break
              case FAT.LIKE:
                query.andWhere(`${tableName}.${attr}`, 'like', `%${filter[attr].toLowerCase()}%`)
                break
            }
          }
        }
      }

      if (this.Model.filterConfig[FAT.ML] && this.Model.filterConfig[FAT.ML].length > 0) {
        query.leftJoin(...this.Model.leftJoinOptions())
        for (const attr of this.Model.filterConfig[FAT.ML]) {
          if (filter[attr]) {
            query.andWhereRaw(`(LOWER(\`${attr}\`) LIKE :${attr} OR LOWER(\`l_${attr}\`) LIKE :${attr})`, { [`${attr}`]: `%${filter[attr].toLowerCase()}%` })
          }
        }
        query.groupBy(`${tableName}.id`)
      }
    }

    query.select(`${tableName}.*`)
    return query
  }

  /**
   * Create new model
   * @param request
   * @param response
   * @returns {Promise.<void>}
   */
  async create ({ request, response, auth }) {
    this.auth = auth
    this.request = request
    this.formData = request.only(this.Model.getFormDataList())
    await this.beforeCreate()
    const model = await this.Model.create(this.formData)
    await this.afterCreate(model)
    await this.afterSaveModel(model)
    return response.json({ model: await this.prepareModel(model) })
  }

  async beforeCreate () {
  }

  async afterCreate () {
  }

  /**
   * Update model
   * @param request
   * @param response
   * @param params
   * @param auth
   * @returns {Promise.<void>}
   */
  async update ({ request, response, params, auth }) {
    this.auth = auth
    this.request = request
    this.formData = request.only(this.Model.getFormDataList())
    const model = await this.Model.find(params.id)

    await this.beforeUpdate(model)

    for (const attr of Object.keys(this.formData)) {
      model[attr] = this.formData[attr]
    }
    await model.save()

    await this.afterUpdate(model)

    await this.afterSaveModel(model)
    return response.json({ model: await this.prepareModel(model) })
  }

  async afterSaveModel (model) {
    if (model.ml) {
      const mlFieldsData = this.request.input('ml', {})
      await model.updateMl(mlFieldsData)
      if (model.metaData) {
        const metaDataFields = this.request.only(this.Model.metaDataAttributes)
        await model.updateMetaData(metaDataFields, mlFieldsData)
      }
    }
  }

  /**
   * This method can update one attribute from model
   * @param request
   * @param response
   * @param params
   * @returns {Promise.<void>}
   */
  async updateAttribute ({ request, response, params }) {
    const model = await this.Model.find(params.id)
    const attribute = request.input('attribute')
    const value = request.input('value', '')

    if (model && attribute) {
      model[attribute] = value
      await model.save()
    }

    return response.json({ model: await this.prepareModel(model) })
  }

  async beforeUpdate () {
  }

  async afterUpdate () {
  }

  async model ({ response, params }) {
    const model = await this.Model.find(params.id)
    return response.json(await this.prepareModel(model))
  }

  /**
   * Delete model
   * @param response
   * @param params
   * @returns {Promise.<*>}
   */
  async delete ({ response, params }) {
    const model = await this.Model.find(params.id)
    if (model) await model.delete()
    return response.json(true)
  }

  /**
   * Prepare model for admin GUI
   * @param model
   * @returns {Promise.<*>}
   */
  async prepareModel (model) {
    if (!model) return model
    return model.prepareModelForAPI ? model.prepareModelForAPI() : model
  }

  setContentRangeHeader (response, pages, tableName) {
    const { total, page: currentPage, perPage } = pages
    const range = [
      (currentPage - 1) * perPage + 1,
      currentPage * perPage
    ]

    response.safeHeader('Content-Range', `${tableName} ${range[0]}-${range[1] > total ? total : range[1]}/${total}`)
  }

  async deleteMany ({ request, response }) {
    const ids = request.input('ids', '')
      .slice(1, -1)
      .split(',')
    if (!ids.length) {
      return response.badRequest()
    }
    const models = []
    for (const id of ids) {
      const model = await this.Model.find(id)
      if (model) {
        await model.delete()
        models.push(await this.prepareModel(model))
      }
    }
    return response.json({ data: models })
  }
}

module.exports = ModelController
