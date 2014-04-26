
var Doskara = require('doskara');
var options;
Doskara.on('init', function(o) {
  options = o;
});
Doskara.on('transform', function(toTransform) {
  var transformed = toTransform.split('').reverse().join('');
  var remove = (options && options.remove) || [];
  var i;
  for(i = 0; i < remove.length; i++) {
    transformed = transformed.replace(remove[i], '');
  }
  return transformed;
});

Doskara.listen();
