'use strict';

require('mocha');
var assert = require('assert');
var env = require('./');

describe('env-cache', function() {
  it('should export a function', function() {
    assert.equal(typeof env, 'function');
  });

  it('should export an object', function() {
    assert(env);
    assert.equal(typeof env, 'object');
  });

  it('should throw an error when invalid args are passed', function(cb) {
    try {
      env();
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected first argument to be a string');
      assert.equal(err.message, 'expected callback to be a function');
      cb();
    }
  });
});
