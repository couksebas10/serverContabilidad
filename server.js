var express = require('express')
const mongoose = require('mongoose')
var app = express()

var port = 3030
var host = 'localhost'

mongoose.connect('mongodb://127.0.0.1:27017/contabilidad');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    app.get('/', (req, res) => {
        db.collection('usuarios').find().toArray((err, result) => {
            res.send(result)
        })
    })
})

app.get('/getUsuarios', () => {

})

app.listen(port, host)
console.log('Servidor : ' + host + ':' + port)