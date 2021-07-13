/**
*
* @name                      class
* @namespace            js.is
* @type                      Function
* @platform          js
* @platform          ts
* @platform          node
* @status        beta
*
* Check if the passed variable (or array of variables) is/are plain variable(s)
*
* @param         {Mixed|Array}            variable                  The variable(s) to check
* @return        {Boolean}                                         true if is class(es), false if not
*
* @todo      interface
* @todo      doc
* @todo      tests
*
* @example           js
* import isClass = from '@coffeekraken/sugar/js/is/class';
* isClass({ hello: 'world'}); // => false
* const myCoolClass = class Coco{};
* isClass(myCoolClass); // => true
*
* @see       https://www.npmjs.com/package/is-class
* @since     2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)

*/