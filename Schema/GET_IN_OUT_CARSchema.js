const mongoose = require('mongoose')

var Schema = mongoose.Schema

var GET_IN_OUT_CARSchema = new Schema({
  RFID: {
    required: true,
    type: String
  },
  carID: {
    required: true,
    type: String,
    minlength: 6,
    maxlength: 6
  },
  in_out: {
    required: true,
    type: String,
    enum: ['i', 'o']
  },
  stationID: {
    type: String
  },
  dateTime: {
    required: true,
    type: String
  },
  timeMS: {
    type: Number
  }
})
//
GET_IN_OUT_CARSchema.index({RFID: 1, dateTime: 1}, {unique: true})
var GET_IN_OUT_CAR = mongoose.model('GET_IN_OUT_CAR', GET_IN_OUT_CARSchema)

module.exports.GET_IN_OUT_CAR = GET_IN_OUT_CAR
