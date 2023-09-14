const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

const connectDB = async () => {
    try {
      const conn = await mongoose.connect('mongodb://127.0.0.1:27017/HngStage2');
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