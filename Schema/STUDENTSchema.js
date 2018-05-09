const mongoose = require('mongoose')

var Schema = mongoose.Schema

var STUDENTSchema = new Schema({
  RFID: {
    required: true,
    type: String,
    unique: true
  },
  firstName: String,
  lastName: String
})
var STUDENT = mongoose.model('STUDENT', STUDENTSchema)

module.exports.STUDENT = STUDENT
