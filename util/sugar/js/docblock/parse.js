"use strict";

const __DocblockParser = require('@coffeekraken/docblock-parser');
/**
 * @name                    parse
 * @namespace               sugar.js.docblock
 * @type                    Function
 * 
 * This function allows you to simply parse any strings that contains docblock(s) and return
 * the parsed version un object format
 * 
 * @param           {String}          string        The string to parse
 * @param           {Object}          [settings={}]  The settings to configure how you want to parse the dobclock(s)
 * @return          {Object}                        The object version of the docblock
 * 
 * @example         js
 * import parse from '@coffeekraken/sugar/js/docblock/parse';
 * parse(myString);
 * 
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = function parse(string, settings = {}) {
  const parser = new __DocblockParser({ ...settings
  });
  return parser.parse(string);
};