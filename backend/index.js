require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors()) 

const port = process.env.PORT || 3000

app.get('/', function (req, res) {
  res.send('Hello World')
})
// Array of jokes in JSON format



console.log(`Server is running on port ${port}`)


app.listen(port)