const mongoose = require('mongoose')

const ironSchema = new mongoose.Schema({
  ally: {
    type: String,
    required: true
    // unique: true
  },
  description: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('IronManAlly', ironSchema)
