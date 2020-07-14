"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = returnTag;

const __upperFirst = require('../../string/upperFirst');
/**
 * @name              return
 * @namespace           js.docblock.tags
 * @type              Function
 *
 * Parse the return tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @return      {Object}                      The formated object
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */


function returnTag(data) {
  const stringArray = data.value.trim().split(/(?<=^\S+)\s/);
  return {
    type: stringArray[0] ? __upperFirst(stringArray[0].replace('{', '').replace('}', '').trim()) : '',
    description: stringArray[1] ? stringArray[1].trim() : ''
  };
}

module.exports = exports.default;