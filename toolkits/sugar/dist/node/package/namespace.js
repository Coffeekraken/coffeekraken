"use strict";

const __json = require('./json');

const __deepMerge = require('../object/deepMerge');

const __getFilename = require('../fs/filename');

const __sugarConfig = require('../config/sugar');
/**
 * @name          namespace
 * @namespace     node.package
 * @type          Function
 *
 * This function take a string as parameter like a path, or a doted string like "something.cool" and return you
 * a proper namespace build using the package name, your passed string sanitized, etc...
 *
 * @param       {String}        path        The string path to convert into a proper namespace
 * @param       {Object}        [settings={}]     An object of settings to configure your namespace generation
 * @return      {String}                    The generated namespace
 *
 * @example     js
 * const namespace = require('@coffeekraken/sugar/node/package/namespace');
 * namespace('something.cool'); => // coffeekraken.sugar.something.cool
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */


module.exports = function namespace(path, settings) {
  if (settings === void 0) {
    settings = {};
  }

  settings = __deepMerge(__sugarConfig('core.namespace') || {}, settings); // get the package json content

  const json = __json(settings.context || process.cwd());

  let packageName = '',
      packageVersion = '';
  if (json && json.name) packageName = json.name.replace('@', '').split('/').join('.').trim();
  if (json && json.version) packageVersion = json.version.split('.').join('-'); // sanitize the passed path

  let sanitizedPath = path;

  const filename = __getFilename(path);

  if (filename && sanitizedPath.split('/').length > 1) {
    sanitizedPath = sanitizedPath.replace('/' + filename, '').replace(filename, '');
  }

  sanitizedPath = sanitizedPath.split(' ').join('').split('/').join('.');
  let resultNamespace = settings.pattern.replace('{package.name}', packageName).replace('{package.version}', packageVersion).replace('{path}', sanitizedPath).trim();
  resultNamespace = resultNamespace.split('...').join('.').split('..').join('.');
  return resultNamespace;
};