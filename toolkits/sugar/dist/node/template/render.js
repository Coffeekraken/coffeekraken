"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var __sugarConfig = require('../config/sugar');

var __getFilename = require('../fs/filename');

var __fs = require('fs');

var __path = require('path');

var __getExt = require('../fs/extension');
/**
 * @name              render
 * @namespace         node.template
 * @type              Function
 * @async
 *
 * This function take a view path, a data object and optionaly a settings object to compile
 * the view and return a simple Promise that will be resolved or rejected depending on the
 * process status.
 *
 * @param       {String}        viewPath        The view path to compile. This has to be a dotted path like "my.cool.view" relative to the @config.views.rootDir directory
 * @param       {Object}        [data={}]       An object of data to use to compile the view correctly
 * @param       {Object}        [settings={}]   An object of settings to configure your rendering process. Here's the list of available settings:
 * - No settings for now...
 *
 * @example       js
 * const render = require('@coffeekraken/sugar/node/template/render');
 * const result = await render('my.cool.template, {
 *    hello: 'world'
 * });
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = /*#__PURE__*/function () {
  var _render = _asyncToGenerator(function* (viewPath, data, settings) {
    if (data === void 0) {
      data = null;
    }

    if (settings === void 0) {
      settings = {};
    }

    var engines = {
      'blade.php': require('./bladePhp')
    }; // listing the files available in the passed view folder

    var rootDir = __sugarConfig('views.rootDir');

    var viewDir = viewPath;
    Object.keys(engines).forEach(ext => {
      viewDir = viewDir.replace(".".concat(ext), '');
    });
    viewDir = viewDir.split('.').join('/');

    var viewName = __getFilename(viewDir).trim();

    var folderPath = viewDir.replace(viewName, '').trim(); // list all the files in the folder

    var viewToCompile = "".concat(folderPath).concat(__fs.readdirSync(__path.resolve(rootDir, folderPath)).filter(file => {
      // get the filename
      var filename = __getFilename(file);

      var ext = filename.split('.').slice(1).join('.');

      if (viewName === filename.replace(".".concat(ext), '')) {
        return true;
      }

      return false;
    })[0]);
    var viewToCompileExt = viewToCompile.split('.').slice(1).join('.');
    var viewToCompileWithoutExt = viewToCompile.replace(".".concat(viewToCompileExt), ''); // check if we don't have data passed to check if we can
    // grab them from a json or js file

    if (!data) {
      var jsFilePath = __path.resolve(rootDir, viewToCompileWithoutExt) + '.js';
      var jsonFilePath = __path.resolve(rootDir, viewToCompileWithoutExt) + '.json';

      if (__fs.existsSync(jsFilePath)) {
        data = require(jsFilePath);
      } else if (__fs.existsSync(jsonFilePath)) {
        data = require(jsonFilePath);
      }
    } // get the engine to compile the view


    var engineFn = engines[viewToCompileExt.toLowerCase()];

    if (!engineFn) {
      throw new Error("You try to render the view \"<primary>".concat(viewToCompile, "</primary>\" but these kind of views are not supported yet. Please use one of these views formats: \"<cyan>").concat(Object.keys(engines).join(', '), "</cyan>\"..."));
    } // process to the rendering


    var result = yield engineFn(viewToCompile, data, settings); // return the result

    return result;
  });

  function render(_x, _x2, _x3) {
    return _render.apply(this, arguments);
  }

  return render;
}();