const mongoose = require('mongoose')

var Schema = mongoose.Schema

var STATIONSchema = new Schema({
  stationID: {
    required: true,
    type: String,
    minlength: 10,
    maxlength: 10,
    unique: true
  },
  name: String,
  lat: {
    required: true,
    type: Number
  },
  lng: {
    required: true,
    type: Number
  }
})
var STATION = mongoose.model('STATION', STATIONSchema)

module.exports.STATION = STATION
