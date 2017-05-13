const mongoose = require('mongoose')
const Store = mongoose.model('Store')

module.exports = async (req, res) => {
  req.body.location.type = 'Point' // this is to keep the default type as point within mongoose, as when updating an item it will be removed
  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the new store instead the old one
    runValidators: true // this will force the model to re validate the fields
  }).exec()
  req.flash('success', `Successfully updated <strong>${store.name}</strong> <a href="/stores/${store.slug}">View Store</a>`)
  res.redirect(`/stores/${store._id}/edit`)
}
