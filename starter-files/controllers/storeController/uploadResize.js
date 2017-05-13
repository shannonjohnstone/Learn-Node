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
