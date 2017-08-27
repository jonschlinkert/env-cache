'use strict';

require('mocha');
var assert = require('assert');
var EnvCache = require('./');

describe('env-cache', function() {
  it('should export a function', function() {
    assert.equal(typeof EnvCache, 'function');
  });

  it('should set and get a value', function() {
    var env = new EnvCache('FOO');
    env.set('foo', 'bar');
    assert.equal(env.get('foo'), 'bar');
  });

  it('should throw an error when invalid args are passed', function() {
    assert.throws(function() {
      EnvCache();
    });

    assert.throws(function() {
      new EnvCache();
    });
  });
});
