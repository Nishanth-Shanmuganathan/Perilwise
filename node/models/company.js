const mongoose = require('mongoose')

const companySchema = mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  contactPersonName: {
    type: String,
    required: true
  },
  contactPersonEmail: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  product: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Company', companySchema);

