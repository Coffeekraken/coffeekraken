"use strict";

const __upperFirst = require('@coffeekraken/sugar/js/string/upperFirst');
/**
 * @name              snippet
 * @namespace         src.tags
 * @type              Function
 * 
 * Parse the snippet tag
 * 
 * @param       {Object}          data        The data object parsed in the string
 * @snippet      {Object}                      The formated object
 * 
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */


module.exports = function snippet(data) {
  if (data.content && data.content[data.content.length - 1] === '') {
    data.content = data.content.slice(0, -1);
  }

  return {
    language: typeof data.value === 'string' ? data.value.toLowerCase() : data.value,
    code: data.content.join('\n')
  };
};