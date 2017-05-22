const homePage = require('./homePage')
const mapPage = require('./mapPage')
const getStores = require('./getStores')
const getStoreBySlug = require('./getStore')
const addStore = require('./addStore')
const createStore = require('./createStore')
const editStore = require('./editStore')
const updateStore = require('./updateStore')
const { upload, resize } = require('./uploadResize')
const { getStoresByTag } = require('./tags')
const searchStores = require('./searchStores')
const mapStores = require('./mapStores')
const heartStore = require('./heartStore')

module.exports = {
  mapPage,
  getStores,
  addStore,
  createStore,
  editStore,
  getStoreBySlug,
  getStores,
  updateStore,
  upload,
  resize,
  getStoresByTag,
  searchStores,
  mapStores,
  heartStore
}
