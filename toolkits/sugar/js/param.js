"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = param;

var __parse = require('../../string/parse');

var __upperFirst = require('../../string/upperFirst');
/**
 * @name              param
 * @namespace           sugar.js.docblock.tags
 * @type              Function
 *
 * Parse the param tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @param      {Object}                      The formated object
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */


function param(data) {
  if (!Array.isArray(data)) data = [data];
  var res = {};
  data.forEach(param => {
    if (typeof param !== 'object' || !param.value || typeof param.value !== 'string') return;
    var parts = param.value.split(/\s{2,20000}/).map(l => l.trim());
    var type = parts && parts[0] ? __upperFirst(parts[0].replace('{', '').replace('}', '')) : null;
    var variable = parts && parts[1] ? parts[1] : null;
    var description = parts && parts[2] ? parts[2] : null;
    var name = variable;
    var defaultValue = undefined;
    var variableMatch = null;
    if (variable && typeof variable === 'string') variableMatch = variable.match(/^\[(.*)\]$/);

    if (type && type.includes('|')) {
      type = type.split('|').map(l => __upperFirst(l.trim()));
    }

    if (variableMatch) {
      var variableParts = variableMatch[1].split('=');

      if (variableParts.length === 2) {
        name = variableParts[0].trim();
        defaultValue = __parse(variableParts[1].trim());
      }
    }

    res[name] = {
      name,
      type,
      description,
      default: defaultValue
    };
    if (param.content) res[name].content = param.content.join('\n');
  });
  return res;
}

module.exports = exports.default;