'use strict'

const Model = use('Model')
const Helpers = use('Helpers')
const randomstring = require('randomstring')

class File extends Model {
  static boot () {
    super.boot()
    this.addHook('afterDelete', 'FileHook.removeFile')
  }

  static get table () {
    return 'files'
  }

  getDir () {
    return `${Helpers.appRoot()}/uploads`
  }

  getFilePath () {
    const dir = this.getDir()
    return `${dir}/${this.filename}`
  }

  async saveFile (file, created_by) {
    if (!file) return null
    await file.move(this.getDir(), {
      name: `${randomstring.generate()}.${file.subtype}`
    })

    if (!file.moved()) {
      return file.error()
    }

    const model = new File()
    model.filename = file.fileName
    model.original = file.clientName
    model.size = file.size
    model.type = `${file.type}/${file.subtype}`
    model.created_by = created_by
    await model.save()

    return model.id
  }
}

module.exports = File
