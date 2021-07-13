/**
*
* @name          simply
* @namespace            js.string
* @type          Function
* @platform          js
* @platform          ts
* @platform          node
* @status        beta
*
* This function take a string with accents, etc and convert it to a more simply
* version like "éàddö" to "eaddo"
*
* @param       {String}        string        The string to simplyfy
* @param       {Object}        [settings={}]       An object of settings to simplify your string as you want:
* - specialChars (true) {Boolean}: Specify if you want to get rid of the special chars like é, è, etc...
* - lowerCase (true) {Boolean}: Specify if you want your returned string to be lowercased
* - dashSpace (true) {Boolean}: Specify if you want to replace the "_|-" by a space
* - trim (true} {Boolean}: Specify if you want your string to be trimed or not
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example       js
* import simplify from '@coffeekraken/sugar/js/string/simplify';
* simplify('éàddö'); // => eaddo
*
* @since     2.0.0
* @author    João Filipe Ventura Coelho <joaoventura93@outlook.com>

*/