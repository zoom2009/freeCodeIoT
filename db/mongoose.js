const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/myDB').then(() => {
  console.log('@@@ Connect Mongodb Success @@@')
}, () => {
  console.log('!!! Fail to connect Mongodb !!!')
})

module.exports = {mongoose}
