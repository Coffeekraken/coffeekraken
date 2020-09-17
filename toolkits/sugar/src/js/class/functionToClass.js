import __funcToClass from 'func-to-classes';

/**
 * @name            functionToClass
 * @namespace       sugar.js.class
 * @type            Function
 *
 * Transform ES5 Functions to ES6 Classes
 *
 * @param       {Function}          function        The function to transform into class
 * @return      {Class}                             An ES6 class version of your function
 *
 * @example         js
 * import functionToClass from '@coffeekraken/sugar/js/class/functionToClass';
 * functionToClass(function coco() {});
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default __funcToClass;
