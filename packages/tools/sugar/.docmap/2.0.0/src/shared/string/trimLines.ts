/**
*
* @name          trimLines
* @namespace            js.string
* @type          Function
* @platform          js
* @platform          ts
* @platform          node
* @status        beta
*
* This function take a string and trim each lines
*
* @param       {String}        string        The string to trim lines of
* @param       {Object}        [settings={}]     An object settings. Here's the object properties:
* - leftPadding (0) {Number}: Specify a left padding to set. 1 padding represent 1 space character
* - rightPadding (0) {Number}: Specify a right padding to set.
* - keepEmptyLines (true) {Boolean}: Specify if you want to keep empty lines or not
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example         js
* import trimLines from '@coffeekraken/sugar/js/string/trimLines';
* trimLines(`my cool lines
*      that have some lines to trim
* and some not...`);
* // my cool lines
* // that have some lines to trim
* // and some not...
*
* @since       2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/