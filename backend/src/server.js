const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()

//BodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())
app.use(express.json())

//Database

mongoose.connect('mongodb://julio:32991046@omnisstack-shard-00-00-a9vqx.mongodb.net:27017,omnisstack-shard-00-01-a9vqx.mongodb.net:27017,omnisstack-shard-00-02-a9vqx.mongodb.net:27017/learning?ssl=true&replicaSet=OmnisStack-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Database connected successfully!'))

// For Upload
app.use('/files', express.static(path.resolve(__dirname, '..', 'upload')))
app.use(require('./routes'))

const port = 8080
app.listen(port, () => console.log('Server running on port ', port))