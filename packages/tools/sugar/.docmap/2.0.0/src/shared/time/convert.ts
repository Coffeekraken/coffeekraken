/**
*
* @name                                  convert
* @namespace            js.time
* @type                                  Function
* @platform          js
* @platform          ts
* @platform          node
* @status        beta
*
* This function allows you to convert time like seconds, ms, hours, minutes, etc... from one format to another
*
* @param           {String|Number}             from                  The value to start from like "10s", "20ms", "2h", etc...
* @param           {String}                    [to='ms']             The format you want to get back
* @return          {Number}                                          The converted value
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example           js
* import convert from '@coffeekraken/sugar/js/time/convert';
* convert('10s', 'ms'); // => 10000
*
* @since       2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/