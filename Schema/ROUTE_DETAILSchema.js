const mongoose = require('mongoose')

var Schema = mongoose.Schema

var ROUTE_DETAILSchema = new Schema({
  carID: {
    required: true,
    type: String,
    minlength: 6,
    maxlength: 6
  },
  from: {
    required: true,
    type: String,
    minlength: 10,
    maxlength: 10
  },
  to: {
    required: true,
    type: String,
    minlength: 10,
    maxlength: 10
  },
  index: {
    required: true,
    type: Number
  }
})
ROUTE_DETAILSchema.index({carID: 1, index: 1}, {unique: true})
var ROUTE_DETAIL = mongoose.model('ROUTE_DETAIL', ROUTE_DETAILSchema)

module.exports.ROUTE_DETAIL = ROUTE_DETAIL
