const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  Number: {type: Number, required: true, unique: true},
  Ext: {type: String}
})

module.exports = model('Series', schema)