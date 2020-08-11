"use strict";

var __fs = require('fs');

var __SNav = require('../nav/SNav');

var __SNavItem = require('../nav/SNavItem');

var __isJson = require('../is/json');

var __isPath = require('../is/path');

var __ensureExists = require('../object/ensureExists');

var __get = require('../object/get');

var __set = require('../object/set');

var __paramCase = require('../string/paramCase');

var __deepMerge = require('../object/deepMerge');

var __sugarConfig = require('../config/sugar');
/**
 * @name              docNav
 * @namespace           node.doc
 * @type              Function
 *
 * This function take as parameter a docMap JSON data structure and convert it to an
 * SNav instance that you can convert then into markdown, html, etc...
 *
 * @param       {Object}          [docMap=`${__sugarConfig('doc.rootDir')}/docMap.json`]             Either directly a docMap JSON or a docMap.json path
 * @param       {Object}          [settings={}]     A settings object that will be passed to the SNav constructor
 * - url ([path]) {String}: Specify the url you want in each SNavItem. The token "[path]" will be replaced by the actual doc file path
 * - id (doc) {String}: Specify the id passed to the SNav instance
 * - text (Documentation) {String}: Specify the text passed to the SNav instance
 * @return      {SNav}                              An SNav instance representing the document navigation
 *
 * @example       js
 * const docNav = require('@coffeekraken/sugar/node/doc/docNav');
 * docNav('something/docMap.json');
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = function docNav(docMap, settings) {
  if (docMap === void 0) {
    docMap = "".concat(__sugarConfig('doc.rootDir'), "/docMap.json");
  }

  if (settings === void 0) {
    settings = {};
  }

  settings = __deepMerge({
    url: '[path]',
    id: 'doc',
    text: 'Documentation'
  }, settings);
  var finalNavObj = new __SNav(settings.id, settings.text, []);

  if (!__isJson(docMap) && !__isPath(docMap, true)) {
    // throw new Error(
    //   `You try to generate a docNav by passing "${docMap}" as parameter but this parameter MUST be either a valid docMap JSON or a valid docMap.json file path...`
    // );
    return finalNavObj;
  }

  var json = docMap;

  if (__isPath("".concat(docMap, "/docMap.json"), true)) {
    json = JSON.parse(__fs.readFileSync("".concat(docMap, "/docMap.json"), 'utf8'));
  } else if (__isPath(docMap, true)) {
    json = JSON.parse(__fs.readFileSync(docMap, 'utf8'));
  }

  var navObj = {};
  Object.keys(json.flat).forEach(path => {
    var item = json.flat[path];

    __ensureExists(navObj, "".concat(item.namespace, ".").concat(item.name), null);
  });

  function deep(currentNavInstance, dotPath) {
    if (dotPath === void 0) {
      dotPath = '';
    }

    // get nav items in the navObj
    var navItem = __get(navObj, dotPath);

    if (navItem === null) {
      var docMapItem = json.flat[dotPath];
      var sNavItem = new __SNavItem(__paramCase(dotPath), docMapItem.title, settings.url.replace('[path]', docMapItem.path));
      currentNavInstance.addItem(sNavItem);
    } else if (typeof navItem === 'object') {
      Object.keys(navItem).forEach(navKey => {
        var newDotKey = dotPath.split('.').filter(i => i !== '');
        newDotKey = [...newDotKey, navKey].join('.');
        var navInstance = new __SNav(__paramCase(newDotKey), newDotKey, []);
        currentNavInstance.addItem(navInstance);
        deep(navInstance, newDotKey);
      });
    }
  }

  deep(finalNavObj, ''); // console.log(finalNavObj.toHtml());

  return finalNavObj;
};