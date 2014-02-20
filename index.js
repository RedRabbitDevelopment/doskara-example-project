
var express = require('express');
var app = express();

var Doskara = require('doskara');

app.get('/', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World');
  res.end();
});

app.get('/404', function(req, res) {
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.write('Page not found!');
  res.end();
});

app.listen(Doskara.ports.proxy);
