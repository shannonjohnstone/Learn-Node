const mongoose = require('mongoose')
const Store = mongoose.model('Store')

module.exports = async (req, res) => {
  const stores = await Store.find() // query database
  res.render('stores', { title: 'stores', stores })
}
