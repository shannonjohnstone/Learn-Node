const mongoose = require('mongoose')
const Store = mongoose.model('Store')

module.exports = async (req, res) => {
  const coordinates = [req.query.lng, req.query.lat].map(parseFloat)
  const q = {
    location: {
      $near: { // $near is a mongodb paremater that works with geometry points
        $geometry: {
          type: 'Point',
          coordinates
        },
        $maxDistance: 10000 // 10km
      }
    }
  }
  // .select() can be used to pick out values from a query, -example will say you do not want that value
  const stores = await Store.find(q).select('slug name description location photo').limit(10)
  res.json(stores)
}
