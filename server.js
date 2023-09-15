if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.locals.errors = null;

app.use('/', require('./routes/personRoute'))

const port = 3000;

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Running on port ${port}`)
    })
})