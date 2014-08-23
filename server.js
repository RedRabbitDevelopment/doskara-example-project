
var express = require('express');
var app = express();
var links = require('docker-links').parseLinks(process.env);

var client = require('socket.io-client')('https://' + links.store.hostname + ':' + links.store.port);

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
  console.log('getting all');
  client.emit('getAll', function(data) {
    console.log('got all', data);
    res.json(data);
  });
});
app.post('/data', function(req, res) {
  console.log('about to save', req.body);
  client.emit('save', req.body.body, function() {
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
