/**
*
* @name        includes
* @namespace            js.string
* @type      Function
* @platform          js
* @platform          ts
* @platform          node
* @status        beta
*
* Same as the native String.includes function but accept either an array of items
* or a simple comma separated string like "something,cool,hello,world"
*
* @param    {String}    string    The string to check
* @param     {Array|String}    values      An array or comma separated string to check
* @return    {Boolean|Array}     An array of values that exists in the string or false if nothing match
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example    js
* import includes from '@coffeekraken/sugar/js/string/includes'
* includes('Hello world', 'world,coco') // ['world']
*
* @since     2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/