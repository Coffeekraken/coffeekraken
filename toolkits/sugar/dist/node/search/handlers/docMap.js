"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var __deepMerge = require('../../object/deepMerge');

var __packageRoot = require('../../path/packageRoot');

var __fs = require('fs');

var __Fuse = require('fuse.js');

var __SSearchResultItem = require('../SSearchResultItem');

var __searchQueryParser = require('search-query-parser');

var __SUrlAction = require('../../action/browser/SUrlAction');
/**
 * @name                search
 * @namespace           node.search.handlers
 * @type                Function
 *
 * This function is responsible of handling the docMap search
 * by filtering the docMap and send back the serch result json.
 *
 * @param         {String}        searchString        The searching string
 * @param         {Object}        [settings={}]       A settings object to configure your search process. Here's the available settings:
 * @return        {Promise}                         A promise that will be resolved with an array of SSearchResultItem object either as full instances, or in JSON format depending on the settings.format property
 *
 * @since       2.0.0
 * @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = function search(searchString, settings) {
  if (settings === void 0) {
    settings = {};
  }

  settings = __deepMerge({
    filePath: __packageRoot() + '/docMap.json',
    action: {
      url: '/doc[path]'
    }
  }, settings);

  var queryObj = __searchQueryParser.parse(searchString.trim(), {
    keywords: ['name', 'namespace', 'path']
  });

  delete queryObj.offsets;
  delete queryObj.exclude;

  if (typeof queryObj !== 'object' || !Object.keys(queryObj).length) {
    queryObj = {};
    queryObj.namespace = searchString;
  }

  return new Promise((resolve, reject) => {
    // load the docmap
    if (!__fs.existsSync(settings.filePath)) {
      throw new Error("You try to make a research using the <primary>docMap</primary> search handler but it seems that your configuration point to a file that does not exists \"<cyan>".concat(settings.filePath, "</cyan>\"..."));
    }

    var docMap = require(settings.filePath);

    var fuse = new __Fuse(docMap, {
      includeScore: true,
      includeMatches: true,
      minMatchCharLength: 2,
      shouldSort: true,
      keys: Object.keys(queryObj)
    });
    var operators = [];
    Object.keys(queryObj).forEach(key => {
      operators.push({
        [key]: queryObj[key]
      });
    });
    var pathsArray = [];
    var results = fuse.search({
      $and: operators
    }).map(item => {
      return _objectSpread({}, item.item);
    }).filter(item => {
      if (pathsArray.indexOf(item.path) === -1) {
        pathsArray.push(item.path);
        return true;
      }

      return false;
    }).map(item => {
      var action;

      if (typeof settings.action === 'function') {
        action = settings.action(item);
      } else if (typeof settings.action === 'object') {
        action = new __SUrlAction({
          url: settings.action.url.replace('[path]', item.path),
          target: '_self'
        });
      }

      return new __SSearchResultItem(item.name, item.namespace, action, {});
    }); // resolving the handler with the results array

    resolve(results);
  });
};