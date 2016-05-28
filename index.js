/*!
 * env-cache (https://github.com/jonschlinkert/env-cache)
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var debug = require('debug')('env-cache');

module.exports = function(config) {
  return function(app) {
    if (this.isRegistered('env-cache')) return;
    debug('initializing "%s", from "%s"', __filename, module.parent.id);

    this.define('env', function() {
      debug('running env');
      
    });
  };
};
