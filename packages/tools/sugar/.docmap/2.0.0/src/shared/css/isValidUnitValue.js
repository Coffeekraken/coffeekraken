/**
*
* @name            isValidUnitValue
* @namespace       shared.css
* @type            Function
* @platform          js
* @platform          ts
* @platform          node
* @status          beta
*
* This function tells you if the passed value is a valid css unit based one like 10px, 20em, etc...
*
* @param       {String|Number}         value       The value to check
* @return      {Boolean}                           true if is a valid unit based value, false if not
*
* @example         js
* import isValidUnitValue from '@coffeekraken/sugar/shared/css/isValidUnitValue';
* isValidUnitValue('10px'); // => true
* isValidUnitValue('default'); // => false
*
* @since       2.0.0
* @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/