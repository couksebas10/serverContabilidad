var express = require('express')
var bodyParser = require('body-parser')
const mongoose = require('mongoose')
var app = express()

var port = 3030
var host = 'localhost'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    next()
})

mongoose.connect('mongodb://127.0.0.1:27017/contabilidad')
var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', function () {
    app.get('/', (req, res) => {
        res.send('Bienvenido Servidor Contabilidad !')
    })
})

app.get('/getUsuarios', (req, res) => {
    db.collection('usuarios').find().toArray((err, result) => {
        res.send(result)
    })
})

app.listen(port, host)
console.log('Servidor : ' + host + ':' + port)