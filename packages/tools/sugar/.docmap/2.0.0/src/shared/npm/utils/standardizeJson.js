/**
*
* @name            standardizeJson
* @namespace            js.npm
* @type            Function
* @platform          js
* @platform          ts
* @platform          node
* @status        beta
*
* This function simply take a package.json JSON formatted object and standardize
* some fields like the "author" one to be sure it is an object at the end,
* the "contributors" array the same way as the "author" one, etc... Here's the list
* of processed actions:
* 1. Transform the string version of the "author" field into an object with the properties "name", "email" and "url"
* 2. Transform the string version of the "contributors" field into an object with the properties "name", "email" and "url"
*
* @param       {Object}        json        The json to process
* @return      {Object}                    The standardized json
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example       js
* import standardizeJson from '@coffeekraken/sugar/js/npm/utils/standardizeJson';
* standardizeJson({
*    "author": "Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)"
* }); // => {
*    "author": {
*      "name": "Olivier Bossel",
*      "email": "olivier.bossel@gmail.com",
*      "url": "https://olivierbossel.com"
*    }
* }
*
* @since       2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/