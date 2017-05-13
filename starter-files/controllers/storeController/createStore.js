const mongoose = require('mongoose')
const Store = mongoose.model('Store')

module.exports = async (req, res) => {
  console.log(req.body);
  const store = await (new Store(req.body)).save()
  req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`)
  res.redirect(`/store/${store.slug}`)
}
