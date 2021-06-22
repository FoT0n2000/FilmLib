const express = require('express')
const fileUpload = require('express-fileupload');
const cors = require('cors');
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.options('*', cors())

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/categories', require('./routes/categories.js'))
app.use('/api/titles', require('./routes/titles.js'))
app.use ('/api', require('./static.js'))
app.use(fileUpload())
//app.use('/api/', require('./routes/redirect.routes'))


const PORT = config.get('port') || 5000

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()