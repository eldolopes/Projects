const mongoose = require('mongoose')
const shortId = require('shortid')

const shortUrlSchema = new mongoose.Schema({
  yourUrl: {
    type: String,
    required: true
  },
  goShortUrl: {
    type: String,
    required: true,
    default: shortId.generate
  },
  hits: {
    type: Number,
    required: true,
    default: 0
  }
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema)