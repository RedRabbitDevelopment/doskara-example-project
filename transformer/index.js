
var options;
var init = function(o) {
  options = o;
};
module.exports = function(toTransform) {
  var transformed = toTransform.split('').reverse().join('');
  var remove = (options && options.remove) || [];
  var i;
  for(i = 0; i < remove.length; i++) {
    transformed = transformed.replace(remove[i], '');
  }
  return transformed;
};
