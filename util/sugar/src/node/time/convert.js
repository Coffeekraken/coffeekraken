/**
 * @name                                  convert
 * @namespace                             sugar.node.time
 * @type                                  Function
 * 
 * This function allows you to convert time like seconds, ms, hours, minutes, etc... from one format to another
 * 
 * @param           {String|Number}             from                  The value to start from like "10s", "20ms", "2h", etc...
 * @param           {String}                    [to='ms']             The format you want to get back
 * @return          {Number}                                          The converted value
 * 
 * @example           js
 * const convert = require('@coffeekraken/sugar/node/time/convert');
 * convert('10s', 'ms'); // => 10000
 * 
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = require('../../../js/time/convert');