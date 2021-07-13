/**
*
* @name                  convert
* @namespace            js.unit
* @type                  Function
* @platform          js
* @platform          ts
* @platform          node
* @status        beta
*
* Convert a passed unit to the wanted one. If the passed unit is a number and not a string like "10rem", the unit is take as pixels
*
* @param         {String|Number}           from            The base value to convert
* @param         {String}                  [to='px']       The value unit you want back
* @return        {Number}                                  The converted value
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example       js
* import convert from '@coffeekraken/sugar/js/unit/convert';
* convert('2rem', 'px');
*
* @since       2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/