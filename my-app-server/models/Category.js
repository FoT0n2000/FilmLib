const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  Name: {type: String, required: true, unique: true},
  Titles: [{ type: Types.ObjectId, ref: 'Title' }]
})

module.exports = model('Category', schema)