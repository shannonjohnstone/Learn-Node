const mongoose = require('mongoose')
const Store = mongoose.model('Store')

exports.getStoresByTag = async (req, res) => {
  const tag = req.params.tag
  const tagQuery = tag || { $exists: true }

  const tagsPromise = Store.getTagsList()
  const storesPromise = Store.find({ tags: tagQuery })

  const [tags, stores] = await Promise.all([tagsPromise, storesPromise])
  res.render('tag', { title: 'Tags', tags, tag, stores })
}
