
var express = require('express');
var app = express();

var Doskara = require('doskara');

app.engine('engine', require('ejs-locals'));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/404', function(req, res) {
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.write('Page not found!');
  res.end();
});

app.listen(Doskara.ports.proxy);
