/**
*
* @name            parseAuthorString
* @namespace            js.npm
* @type            Function
* @platform          js
* @platform          ts
* @platform          node
* @status        beta
*
* This function simply take an author string like "Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)" and
* transform it into a plain object with these properties: name, email and url
*
* @param       {String}          string          The string to parse
* @return      {Object}                          The plain object version of the string
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example       js
* import parseAuthorString from '@coffeekraken/sugar/js/npm/utils/parseAuthorString';
* parseAuthorString("Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)")
* // => {
*   "name": "Olivier Bossel",
*   "email": "olivier.bossel@gmail.com",
*   "url": "https://olivierbossel.com"
* }
*
* @since       2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/