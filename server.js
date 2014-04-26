
var express = require('express');
var app = express();
var doskara = require('doskara');
var dataStore = new doskara.Client('doskara-example-data-store');
var transformer = require('./transformer');

dataStore.init().then(function() {
  dataStore.setBeforeSave(transformer);
});

app.engine('engine', require('ejs-locals'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

app.get('/', function(req, res) {
  res.render('index');
});
app.get('/data', function(req, res) {
  dataStore.getAll().then(function(data) {
    res.json(data);
  });
});
app.post('/data', function(req, res) {
  dataStore.save(req.body, function() {
    res.json({success: true});
  });
});

app.use(function(req, res) {
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.write('Page not found!');
  res.end();
});

var server = app.listen(doskara.ports.main, function() {
  console.log('listening on port ' + doskara.ports.main);
});
