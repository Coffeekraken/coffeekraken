/**
*
* @name              extractSame
* @namespace            js.string
* @type              Function
* @platform          js
* @platform          ts
* @platform          node
* @status        beta
*
* This function return you what has been find the same in the two passed string.
* It will return you either an array of same string parts or a simple string
* representing the first same part found.
*
* @param         {String}            string1         The string 1 to compare
* @param         {String}            string2         The string 2 to compare
* @param         {Boolean}           [multiple=false]      Specify if you want to get back multiple same string if exists as an array
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example       js
* import extractSame from '@coffeekraken/sugar/js/string/extractSame';
* extractSame('Hello world', 'Hello plop'); // => 'Hello '
*
* @since       2.0.0
* @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/