const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  Ext: {type: String}
})

module.exports = model('Picture', schema)