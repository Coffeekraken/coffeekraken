"use strict";

var __jsonSass = require('json-sass-vars');

var __deepMerge = require('../../object/deepMerge');

module.exports = function jsObjectToScssMap(object, settings) {
  if (settings === void 0) {
    settings = {};
  }

  settings = __deepMerge({
    settingsVariable: '$sugarUserSettings',
    quoteKeys: ['src', 'import', 'font-family', 'defaultAction']
  }, settings);
  var jsObject = object;

  var scssConfigString = __jsonSass.convertJs(jsObject);

  scssConfigString = "".concat(settings.settingsVariable, ": ").concat(scssConfigString, ";");
  scssConfigString.split('\n').forEach(line => {
    line = line.trim();
    var isComma = line.substr(-1) === ',';

    if (isComma) {
      line = line.slice(0, -1);
    }

    var prop = line.split(':')[0];
    var value = line.split(':').slice(1).join(':').trim();
    if (prop === '),' || prop === ')' || value === '(') return; // process arrays

    var arrayReg = /^\((.*)\),?/;
    var arrayMatches = value.match(arrayReg);

    if (arrayMatches) {
      var res = arrayMatches[1].split(',').map(val => {
        return "'".concat(val.trim(), "'");
      }).join(', ');
      value = value.replace(arrayMatches[1], res);
      scssConfigString = scssConfigString.replace(line, "".concat(prop, ": ").concat(value));
      return;
    }

    if (settings.quoteKeys.indexOf(prop) === -1) return;
    scssConfigString = scssConfigString.replace(line, "".concat(prop, ": \"").concat(value, "\""));
  }); // set or append in the "data" property

  return scssConfigString;
};