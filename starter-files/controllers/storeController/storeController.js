const mongoose = require('mongoose')
const Store = mongoose.model('Store')
const multer = require('multer')
const jimp = require('jimp')
const uuid = require('uuid')

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/')
    if (isPhoto) next(null, true)
    else next({ message: 'That filetype isn\'t allowed' }, false)
  }
}

exports.homePage = (req, res) => {
  res.render('index', { title: 'I love food', name: req.name })
}

exports.addStore = (req, res) => {
  res.render('editStore', { title: 'Add Store' })
}

exports.upload = multer(multerOptions).single('photo')

exports.resize = async (req, res, next) => {
  if (!req.file) return next() // no image so skip to the next
  const extenstion = req.file.mimetype.split('/')[1]
  req.body.photo = `${uuid.v4()}.${extenstion}`

  // now we resize
  const photo = await jimp.read(req.file.buffer)
  await photo.resize(800, jimp.AUTO)
  await photo.write(`./public/uploads/${req.body.photo}`)

  // once we have written photo to the fs continue on
  next()
}

exports.createStore = async (req, res) => {
  console.log(req.body);
  const store = await (new Store(req.body)).save()
  req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`)
  res.redirect(`/store/${store.slug}`)
}

// exports.getStores = async (req, res) => {
//   const stores = await Store.find() // query database
//   res.render('stores', { title: 'stores', stores })
// }

exports.editStore = async (req, res) => {
  const store = await Store.findOne({ _id: req.params.id })
  res.render('editStore', { title: `Edit ${store.name}`, store })
}

exports.updateStore = async (req, res) => {
  req.body.location.type = 'Point' // this is to keep the default type as point within mongoose, as when updating an item it will be removed
  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the new store instead the old one
    runValidators: true // this will force the model to re validate the fields
  }).exec()
  req.flash('success', `Successfully updated <strong>${store.name}</strong> <a href="/stores/${store.slug}">View Store</a>`)
  res.redirect(`/stores/${store._id}/edit`)
}

exports.store = async (req, res) => {
  const store = await Store.findOne({ slug: req.params.slug })
  res.render('store', { title: store.name, store})
}
