const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: Number, required: true},
  favourites: [{ type: Types.ObjectId, ref: 'Title' }]
})

module.exports = model('User', schema)