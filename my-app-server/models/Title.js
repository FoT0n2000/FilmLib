const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  Name: {type: String, required: true, unique: true},
  Picture: {type: Types.ObjectId, ref:'Picture'},
  Description: {type: String},
  trailer: { type: Types.ObjectId, ref: 'Series' },
  Series: [{ type: Types.ObjectId, ref: 'Series' }]
})

module.exports = model('Title', schema)