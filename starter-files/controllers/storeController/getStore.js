const mongoose = require('mongoose')
const Store = mongoose.model('Store')

module.exports = async (req, res, next) => {
  const store = await Store.findOne({ slug: req.params.slug }).populate('author')
  if (!store) return next()
  res.render('store', { title: store.name, store})
}
