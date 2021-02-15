if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.set(express.static('public'))

const mongoose = require('mongoose')

try {
    // Connect to the MongoDB cluster
     mongoose.connect(
       process.env.DATABASE_URL,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected")
    );

  } catch (e) {
    console.log("could not connect");
  }


// const db = mongoose.connect()
// db.on('error', error => console.error(error))
// db.once('open', () => console.log("connected successfully!"))

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)
