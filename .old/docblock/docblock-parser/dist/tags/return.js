"use strict";

const __upperFirst = require('@coffeekraken/sugar/js/string/upperFirst');
/**
 * @name              return
 * @namespace         src.tags
 * @type              Function
 * 
 * Parse the return tag
 * 
 * @param       {Object}          data        The data object parsed in the string
 * @return      {Object}                      The formated object
 * 
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */


module.exports = function returnTag(data) {
  const stringArray = data.value.trim().split(/(?<=^\S+)\s/);
  return {
    type: __upperFirst(stringArray[0].replace('{', '').replace('}', '').trim()),
    description: stringArray[1].trim()
  };
};