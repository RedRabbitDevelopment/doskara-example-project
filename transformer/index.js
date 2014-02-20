
var Doskara = require('doskara');
var doskara = new Doskara(process.env);
var options;
doskara.on('init', function(o) {
  options = o;
});
doskara.on('transform', function(toTransform) {
  var transformed = toTransform.split('').reverse().join('');
  var remove = (options && options.remove) || [];
  var i;
  for(i = 0; i < remove.length; i++) {
    transformed = transformed.replace(remove[i], '');
  }
  return transformed;
});
