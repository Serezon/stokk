'use strict'

const File = use('App/Models/File')
const Helpers = use('Helpers')
const fs = use('fs')
const mime = use('mime-types')
const Errors = use('App/Constants/Errors')
const randomstring = require('randomstring')

const readFile = Helpers.promisify(fs.readFile)

class FileController {
  async get ({ response, params }) {
    const file = await File.query().where('id', params.id).first()
    if (!file) return response.status(404).json({ message: Errors.NOT_FOUND })
    response
      .header('Content-disposition', `attachment; filename=${file.original}`)
      .header('Content-type', mime.lookup(file.original.split('.').pop()))
    return await readFile(file.getFilePath())
  }

  async getByFilename ({ response, params }) {
    const file = await File.query().where('filename', params.filename).first()
    if (!file) return response.status(404).json({ message: Errors.NOT_FOUND })
    response
      .header('Content-disposition', `attachment; filename=${file.original}`)
      .header('Content-type', mime.lookup(file.original.split('.').pop()))

    return await readFile(file.getFilePath())
  }

  async upload ({ request, response, auth }) {
    const file = request.file('file', {
      types: ['image'],
      size: '10mb'
    })

    await file.move(File.getDir(), {
      name: randomstring.generate() + '.' + file.subtype
    })

    if (!file.moved()) {
      return { error: file.error() }
    }

    const model = new File()
    model.filename = file.fileName
    model.original = file.clientName
    model.size = file.size
    model.type = file.type + '/' + file.subtype
    model.created_by = auth.user.id
    await model.save()

    return response.json({ model })
  }

  async delete ({ response, params, auth }) {
    const model = await File.query()
      .where('id', params.id)
      .andWhere('created_by', auth.user.id)
      .first()
    if (!model) response.status(404).json({ message: Errors.NOT_FOUND })
    await model.delete()
    return response.json({ model })
  }
}

module.exports = FileController
