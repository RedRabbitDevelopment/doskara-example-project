
var project = process.argv[2];
var _ = require('lodash');
var sys = require('sys');
var exec = require('child_process').exec;
var Q = require('q');
var Doskara = require('doskara');

exec = Q.denodeify(exec);

if(!project) throw new Error('No project selected');
if(project[project.length - 1] === '/') project = project.substring(0, project.length - 1);
console.log('building project "' + project + '"');

var buildAtom = function(project_name) {
  var details = require('./' + project_name + '/Doskara.json');
  var dependencies = {};
  var promise;
  details.ports = details.ports || {main: 8090};
  // Build Dependencies
  console.log('building deps', project_name);
  return Q.all(_.map(details.dependencies || {}, function(version, dep) {
    return buildAtom(dep);
  })).then(function(deps) {
    // Build container
    var ports, links;
    ports = '';
    links = '';
    if(details.ports) {
      ports = _.map(details.ports, function(port) {
        return '-p ' + ':' + port;
      }).join(' ') + ' ';
    }
    if(deps.length) {
      links = deps.map(function(dep, i) {
        var alias = Doskara.createAlias(dep);
        return '--link ' + dep + ':' + alias;
      }).join(' ') + ' ';
    }
    var deferred = Q.defer();
    var child = exec('bash ./build.sh ' + project_name + ' "' + ports + '" "' + links + '"',
    function(err, out, stderr) {
      console.log(out);
      if(err) return deferred.reject(err);
      if(stderr.length > 0) return deferred.reject(stderr);
      deferred.resolve(project_name);
    });
    return deferred.promise;
  });
}

buildAtom(project).then(function(r) {
  console.log('done!');
}).done();
      
/*
# A cell needs:
  - A list of dependencies name@version, configuration
  - A list of ports that its listening on
  - (optional) buildpack url (not valid)
# A project needs:
  - A list of dependencies name@version, configuration
  - A list of ports that its listening on
  - Who has access to whom
  - Who has incoming access
  - (eventually) - limiting outgoing access
*/

