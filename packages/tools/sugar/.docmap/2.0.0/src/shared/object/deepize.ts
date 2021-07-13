/**
*
* @name          deepize
* @namespace            js.object
* @type          Function
* @platform          js
* @platform          ts
* @platform          node
* @status        beta
*
* This function simply take an object like this one:
* {
*    'something.cool': 'hello'
* }
* and convert it to something like this:
* {
*    something: {
*      cool: 'hello'
*    }
* }
*
* @param       {Object}        object        The object to convert
* @return      {Object}                      The converted object
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example       js
* import deepize from '@coffeekraken/sugar/js/object/deepize';
* deepize({ 'something.cool': 'hello' }); // => { something: { cool: 'hello' } }
*
* @since       2.0.0
* @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/