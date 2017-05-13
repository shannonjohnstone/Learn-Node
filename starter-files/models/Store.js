const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const slug = require('slugs')

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a store name'
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  tags: {
    type: [String],
    required: 'Please enter at least 1 tag'
  },
  created: {
    type: Date,
    default: Date.now
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{
      type: Number,
      required: 'You must supply coordinates!'
    }],
    address: {
      type: String,
      required: 'You must supply an address!'
    }
  },
  photo: String
})

storeSchema.pre('save', function(next) {
  if (!this.isModified('name')) { return next() } // this will skip the slug method if the name value has not been changed
  this.slug = slug(this.name)
  next()
  // TODO make slugs unique so there is no double up
})

module.exports = mongoose.model('Store', storeSchema)
