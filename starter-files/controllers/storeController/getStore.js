const mongoose = require('mongoose')
const Store = mongoose.model('Store')

module.exports = async (req, res, next) => {
  const store = await Store.findOne({ slug: req.params.slug })
  if (!store) return next()
  res.render('store', { title: store.name, store})
}
