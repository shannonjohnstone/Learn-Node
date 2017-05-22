const mongoose = require('mongoose')
const Store = mongoose.model('Store')

module.exports = async (req, res, next) => {
  req.body.author = req.user._id // creating a author for each store, using the creators _id
  const store = await (new Store(req.body)).save()
  req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`)
  res.redirect(`/store/${store.slug}`)
}
