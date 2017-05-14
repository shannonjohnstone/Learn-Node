const homePage = require('./homePage')
const getStores = require('./getStores')
const getStoreBySlug = require('./getStore')
const addStore = require('./addStore')
const createStore = require('./createStore')
const editStore = require('./editStore')
const updateStore = require('./updateStore')
const { upload, resize } = require('./uploadResize')
const { getStoresByTag } = require('./tags')

module.exports = {
  getStores,
  addStore,
  createStore,
  editStore,
  getStoreBySlug,
  getStores,
  updateStore,
  upload,
  resize,
  getStoresByTag
}
