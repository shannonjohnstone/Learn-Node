const mongoose = require('mongoose')
const Store = mongoose.model('Store')

module.exports = async (req, res) => {
  const store = await Store.findOne({ _id: req.params.id })
  res.render('editStore', { title: `Edit ${store.name}`, store })
}
