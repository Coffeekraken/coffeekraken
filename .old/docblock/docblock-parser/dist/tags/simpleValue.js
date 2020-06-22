"use strict";

const __parse = require('@coffeekraken/sugar/js/string/parse');

const __upperFirst = require('@coffeekraken/sugar/js/string/upperFirst');

const __dataTypesArray = require('@coffeekraken/sugar/js/dev/dataTypesArray');
/**
 * @name              simpleValue
 * @namespace         src.tags
 * @type              Function
 * 
 * Parse the simpleValue tag
 * 
 * @param       {Object}          data        The data object parsed in the string
 * @return      {Object}                      The formated object
 * 
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */


module.exports = function simpleValue(data) {
  if (data && data.value && typeof data.value === 'string' && data.value.trim() === '') {
    return true;
  }

  return data.value;
};