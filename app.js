var express = require('express');

var app = express();

app.get('/', function(req, res) {
    res.end('Bienvenue');
})

.listen(8080);