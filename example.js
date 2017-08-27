
var EnvCache = require('./');
var one = new EnvCache('EXAMPLE_ONE');

one.set('foo', false);
one.set('bar', true);
one.set('baz', true);
console.log(one.get('foo'));
console.log(one.get('bar'));
console.log(one.cache);
console.log(process.env);

var two = new EnvCache('EXAMPLE_TWO');
console.log(two.get('foo'));
console.log(two.get('bar'));
console.log(two.get('baz'));
console.log(two.cache);

