const mongoose = require('mongoose')

const ironSchema = new mongoose.Schema({
  suit: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'IronMansuit',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('IronMansuit', ironSchema)
