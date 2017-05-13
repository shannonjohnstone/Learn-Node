const homePage = require('./homePage')
const getStores = require('./getStores')
const getStore = require('./getStore')
const addStore = require('./addStore')
const createStore = require('./createStore')
const editStore = require('./editStore')
const updateStore = require('./updateStore')
const { upload, resize } = require('./uploadResize')

module.exports = {
  getStores,
  addStore,
  createStore,
  editStore,
  getStore,
  getStores,
  updateStore,
  upload,
  resize
}
