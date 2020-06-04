"use strict";

/**
 * @name              simpleValue
 * @namespace         sugar.js.docblock.tags
 * @type              Function
 *
 * Parse the simpleValue tag
 *
 * @param       {Object}          data        The data object parsed in the string
 * @return      {Object}                      The formated object
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
module.exports = function simpleValue(data) {
  if (data && data.value && typeof data.value === 'string' && data.value.trim() === '') {
    return true;
  }

  return data.value;
};