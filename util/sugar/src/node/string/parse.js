/**
 * @name                                  parse
 * @namespace                             sugar.node.string
 * @type                                  Function
 *
 * Parse a string and convert it into his native data type like date, number, boolean, etc...
 *
 * @param             {String}                        value                                 The value to convert
 * @return            {Mixed}                                                               The converted value
 *
 * @example           js
 * const parse = require('@coffeekraken/node/string/parse');
 * parse('10'); // => 10
 *
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function(value) {
  // if (typeof value !== 'string') return value;
  if (typeof value !== 'string') return value;
  try {
    return Function(`
      "use strict";
      return (${value});
    `)();
  } catch(e) {
    return value;
  }

  // return Function(`
  //   "use strict";
  //   try {
  //     if (typeof ${value} == undefined) {
  //       return '${value}';
  //     }
  //     return ${value};
  //   } catch(e) {
  //     // console.error(e);
  //   }
  // `)();
}
