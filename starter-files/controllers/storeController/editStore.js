const mongoose = require('mongoose')
const Store = mongoose.model('Store')

const confirmOwner = (store, user) => {
  if (!store.author._id.equals(user._id)) throw Error('You must own a store in order to edit it!')
}

module.exports = async (req, res) => {
  const store = await Store.findOne({ _id: req.params.id }).populate('author')
  confirmOwner(store, req.user)
  res.render('editStore', { title: `Edit ${store.name}`, store })
}
