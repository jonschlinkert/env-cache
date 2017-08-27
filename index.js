/*!
 * env-cache <https://github.com/jonschlinkert/env-cache>
 *
 * Copyright (c) 2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var debug = require('debug')('env-cache');

/**
 * Create an instance of `EnvCache` with the given `namespace`.
 * The namespace is automatically uppercased and is then used by
 * the [.set](#set) and [.get](#get) methods to prefix keys.
 *
 * ```js
 * var env = new EnvCache('foo');
 * ```
 * @param {String} `namespace` The namespace to use on `process.env`.
 * @api public
 */

function EnvCache(namespace) {
  if (!(this instanceof EnvCache)) {
    return new EnvCache(namespace);
  }
  if (typeof namespace !== 'string') {
    throw new TypeError('expected namespace to be a string');
  }
  this.namespace = namespace.toUpperCase();
}

/**
 * Set a value on your `process.env` namespace.
 *
 * ```js
 * env.set('dev', true);
 * console.log(process.env.FOO_DEV);
 * //=> true
 * ```
 *
 * @param {String} `key`
 * @param {any} `val`
 * @api public
 */

EnvCache.prototype.set = function(key, val) {
  if (typeof key !== 'string') {
    throw new TypeError('expected key to be a string');
  }
  process.env[this._formatKey(key)] = val;
  return this;
};

/**
 * Get a value from your `process.env` namespace.
 *
 * ```js
 * env.set('dev', true);
 * console.log(env.get('dev'));
 * //=> true
 * ```
 *
 * @param {String} `key`
 * @api public
 */

EnvCache.prototype.get = function(key) {
  if (typeof key !== 'string') {
    throw new TypeError('expected key to be a string');
  }
  return process.env[this._formatKey(key)];
};

/**
 * Returns the `true` boolean if the value of `key` is the string "true".
 *
 * ```js
 * env.set('dev', true);
 * console.log(env.enabled('dev'));
 * //=> true
 * ```
 *
 * @param {String} `key`
 * @api public
 */

EnvCache.prototype.enabled = function(key) {
  return this.get(key) === 'true';
};

/**
 * Returns the `false` boolean if the value of `key` is the string "false".
 *
 * ```js
 * env.set('dev', true);
 * console.log(env.disabled('dev'));
 * //=> false
 *
 * env.set('dev', false);
 * console.log(env.disabled('dev'));
 * //=> true
 * ```
 *
 * @param {String} `key`
 * @api public
 */

EnvCache.prototype.disabled = function(key) {
  return this.get(key) === 'false';
};

/**
 * Format `key` using the namespace passed to the ctor.
 * @param {String} key
 * @return {String}
 */

EnvCache.prototype._formatKey = function(key) {
  if (typeof key !== 'string') {
    throw new TypeError('expected key to be a string');
  }
  return (this.namespace + '_' + key).toUpperCase();
};

Object.defineProperty(EnvCache.prototype, 'cache', {
  get: function() {
    var cache = {};
    for (var key in process.env) {
      if (process.env.hasOwnProperty(key) && key.indexOf(this.namespace) === 0) {
        cache[key.slice(this.namespace.length + 1)] = process.env[key];
      }
    }
    return cache;
  }
});

/**
 * Expose `EnvCache`
 */

module.exports = EnvCache;
