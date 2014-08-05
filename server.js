
var express = require('express');
var app = express();
var doskara = require('doskara');
doskara.init(require('./Doskara.json'));
var dataStore = new doskara.Client('doskara-example-data-store');
var transformer = require('./transformer');

dataStore.init().then(function() {
  console.log('Setting their before save', dataStore);
  //dataStore.setBeforeSave(transformer).then(function() {
    dataStore.save('booya').then(function() {
      console.log('saved booya');
   // });
  }).then(function(e) {
    console.log('rejected', e);
  });
});
app.use(function(req, res, next) {
  console.log('got req, ' + req.url);
  next();
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
  console.log('getting all of their stuff', dataStore);
  dataStore.getAll().then(function(data) {
    console.log('got all', data);
    res.json(data);
  });
});
app.post('/data', function(req, res) {
  console.log('about to save', req.body);
  dataStore.save(req.body.body).then(function() {
    console.log('got result');
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
