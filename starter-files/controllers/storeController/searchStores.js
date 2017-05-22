const mongoose = require('mongoose')
const Store = mongoose.model('Store')

module.exports = async (req, res) => {
  const stores = await Store.find({ $text: { $search: req.query.q } },
    { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' }}).limit(5)
  res.json(stores)
}
