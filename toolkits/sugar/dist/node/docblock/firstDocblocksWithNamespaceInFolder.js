"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var __deepMerge = require('../object/deepMerge');

var __findInFiles = require('find-in-files');

var __minimatch = require('minimatch');

var __fs = require('fs');

var __path = require('path');

var __getFilename = require('../fs/filename');

var __extension = require('../fs/extension');

var __SDocblock = require('./SDocblock');
/**
 * @name                  firstDocblockWithNamespaceInFolder
 * @namespace           node.docblock
 * @type                  Function
 * @async
 *
 * This function search in the passed folder for files containing a "@namespace" tag (and an "@name" optional one)
 * and generate a SNav instance with all these founded files as sources...
 *
 * @param         {String}          directory               The directory in which to search for files with the namespace tag
 * @param         {Object}          [settings={}]           A settings object to configure your navigation generation:
 * - exclude ('**\/+(__tests__ | __wip__)\/**') {String}: Specify a glob pattern representing the files to exclude from the generation
 * @return        {Object}                                    An object containing the docblocks holded in each namespaces as properties
 *
 * @example       js
 * const firstDocblockWithNamespaceInFolder = require('@coffeekraken/sugar/node/nav/firstDocblockWithNamespaceInFolder);
 * firstDocblockWithNamespaceInFolder('my/cool/folder');
 *
 * @since       2.0.0
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = /*#__PURE__*/function () {
  var _firstDocblockWithNamespaceInFolder = _asyncToGenerator(function* (directory, settings) {
    if (settings === void 0) {
      settings = {};
    }

    settings = __deepMerge({
      exclude: '**/+(__tests__|__wip__)/**'
    }, settings);
    if (!__fs.existsSync(directory)) return {};
    var founded = yield __findInFiles.find("@namespace", directory);
    var namespaceObj = {};
    Object.keys(founded).forEach(path => {
      var relativePath = __path.relative(directory, path);

      if (__minimatch(relativePath, settings.exclude)) return;

      var content = __fs.readFileSync(path, 'utf8'); // console.log(content);


      var docblocks = new __SDocblock(content);
      var docblock = docblocks.blocks[0] ? docblocks.blocks[0] : null;
      if (!docblock) return;
      delete docblock.object.raw;

      var name = docblock.object.name || __getFilename(path).replace(".".concat(__extension(path)), '');

      namespaceObj[docblock.object.namespace + '.' + name] = _objectSpread(_objectSpread({}, docblock.object), {}, {
        path: relativePath
      });
    });
    return namespaceObj;
  });

  function firstDocblockWithNamespaceInFolder(_x, _x2) {
    return _firstDocblockWithNamespaceInFolder.apply(this, arguments);
  }

  return firstDocblockWithNamespaceInFolder;
}();