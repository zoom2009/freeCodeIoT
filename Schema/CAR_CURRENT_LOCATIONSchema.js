const mongoose = require('mongoose')

var Schema = mongoose.Schema

var CAR_CURRENT_LOCATIONSchema = new Schema({
  carID: {
    required: true,
    type: String,
    minlength: 6,
    maxlength: 6
  },
  lat: {
    required: true,
    type: Number
  },
  lng: {
    required: true,
    type: Number
  },
  dateTime: {
    required: true,
    type: String
  }
})
//
CAR_CURRENT_LOCATIONSchema.index({carID: 1, dateTime: 1}, {unique: true})
var CAR_CURRENT_LOCATION = mongoose.model('CAR_CURRENT_LOCATION', CAR_CURRENT_LOCATIONSchema)

module.exports.CAR_CURRENT_LOCATION = CAR_CURRENT_LOCATION
