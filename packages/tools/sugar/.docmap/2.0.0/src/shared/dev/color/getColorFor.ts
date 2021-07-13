/**
*
* @name            getColorFor
* @namespace            shared.dev.color
* @type            Function
* @platform          js
* @platform          ts
* @platform          node
* @status            beta
*
* This function let you pass anything like an object, a string, etc... and get the same
* color back everytime you pass the same value.
* This if usefull for output logs, etc...
*
* @param       {any}          for             Pass something to take as reference to get the same color back every time
* @return      {String}                        A color name to use as you want
*
* @example         js
* import getColorFor from '@coffeekraken/sugar/shared/dev/color/getColorFor';
* getColorFor('something'); // => cyan
* getColorFor({
*      else: true
* }); // => magenta
* getColorFor('something') // => cyan
*
* @since       2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/