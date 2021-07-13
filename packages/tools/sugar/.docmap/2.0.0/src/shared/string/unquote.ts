/**
*
* @name        unquote
* @namespace            js.string
* @type      Function
* @platform          js
* @platform          ts
* @platform          node
* @status        beta
*
* Remove the quotes of a string
* Types of quotes removed :
* - `"`, `'`, `”`, '`'
*
* @param    {String}    string    The string to process
* @param    {Array<String>}    [quotesToRemove=['"','\'','”','`']]    The quotes to removes
* @return    {String}    The unquoted string
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example    js
* import unquote from '@coffeekraken/sugar/js/string/unquote'
* unquote("'Hello world'") // "Hello world"
*
* @since     2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/