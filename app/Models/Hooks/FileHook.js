'use strict'

const FileHook = exports = module.exports = {}

const Drive = use('Drive')

FileHook.removeFile = async model => {
  await Drive.delete(model.getTempFilePath())
}
