/**
*
* @name        dedupe
* @namespace            js.string
* @type        Function
* @platform          js
* @platform          ts
* @platform          node
* @status        beta
*
* This function simple make sure that you don't have duplicate statements in the passed string
*
* @param           {String}        string        The string to process
* @param           {String}        statement       The statement to check
* @return          {String}                      The deduplicated string
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example       js
* import dedupe from '@coffeekraken/sugar/js/string/dedupe';
* dedupe('hello world hello your', 'hello'); // => hello world your
*
* @since       2.0.0
* @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/