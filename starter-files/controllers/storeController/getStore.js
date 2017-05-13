const mongoose = require('mongoose')
const Store = mongoose.model('Store')

module.exports = async (req, res) => {
  const store = await Store.findOne({ slug: req.params.slug })
  res.render('store', { title: store.name, store})
}
