// @ts-nocheck

import __funcToClass from 'func-to-classes';

/**
 * @name            functionToClass
 * @namespace            js.class.utils
 * @type            Function
 * @platform          js
 * @platform          ts
 * @platform          node
 * @status          beta
 *
 * Transform ES5 Functions to ES6 Classes
 *
 * @param       {Function}          function        The function to transform into class
 * @return      {Class}                             An ES6 class version of your function
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import functionToClass from '@coffeekraken/sugar/js/class/functionToClass';
 * functionToClass(function coco() {});
 *
 * @see             https://www.npmjs.com/package/func-to-classes
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default __funcToClass;
