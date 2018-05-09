const mongoose = require('mongoose')

var Schema = mongoose.Schema

var CAR_STATESchema = new Schema({
  carID: {
    required: true,
    type: String,
    minlength: 6,
    maxlength: 6
  },
  status: {
    required: true,
    type: String,
    enum: ['r', 's'] //running, stop
  },
  seats: {
    required: true,
    type: Number,
    min: 0,
    max: 4
  },
  dateTime: {
    required: true,
    type: String
  }
})
//
CAR_STATESchema.index({carID: 1, dateTime: 1}, {unique: true})
var CAR_STATE = mongoose.model('CAR_STATE', CAR_STATESchema)

module.exports.CAR_STATE = CAR_STATE
