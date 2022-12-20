var express = require('express');
var app = express();

app.get('/', function(req, res) {
  // do something
})

app.get('/api', function (req, res) {
    res.send('okkkkkk');
  })

app.listen(5000);