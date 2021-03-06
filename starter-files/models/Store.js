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
    type: [String]
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
  photo: String,
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author'
  }
}, {
  toJSON: { virtuals: true }, // this is to make virtuals visable (if needed)
  toObject: { virtuals: true } // this is to make virtuals visable (if needed)
})

// define indexes
storeSchema.index({
  name: 'text',
  description: 'text'
})

storeSchema.index({ location: '2dsphere' })

storeSchema.pre('save', async function(next) {
  if (!this.isModified('name')) { return next() } // this will skip the slug method if the name value has not been changed
  this.slug = slug(this.name)

  // find other stores with same name so we can give them a unigue slug via a number value
  const slugRegex = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i')
  const storesWithSlug = await this.constructor.find({ slug: slugRegex }) // this will find all matching named entries and put them in an array

  // if this search retuened items it will find the current length and dynamiclly set the new slug to be incremented by 1
  if (storesWithSlug.length) this.slug = `${this.slug}-${storesWithSlug.length + 1}`

  next()
})

storeSchema.statics.getTagsList = function() {
  return this.aggregate([
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ])
}

storeSchema.virtual('reviews', {
  ref: 'Review', // which models to link
  localField: '_id', // which field on the store
  foreignField: 'store' // which field on review
})

module.exports = mongoose.model('Store', storeSchema)
