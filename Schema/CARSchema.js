const mongoose = require('mongoose')

var Schema = mongoose.Schema

var CARSchema = new Schema({
  carID: {
    required: true,
    type: String,
    minlength: 6,
    maxlength: 6,
    unique: true
  },
  startStation: {
    required: true,
    type: String,
    minlength: 10,
    maxlength: 10
  },
  finishStation: {
    required: true,
    type: String,
    minlength: 10,
    maxlength: 10
  }
})
var CAR = mongoose.model('CAR', CARSchema)

module.exports.CAR = CAR
