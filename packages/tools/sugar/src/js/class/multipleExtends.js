import __aggregation from 'aggregation/es5';
/**
 * @name                multipleExtends
 * @namespace           sugar.js.class
 * @type                Function
 *
 * This function allows you to extends your class with multiple other ones.
 *
 * @param     {Class}           ...classes          All the classed you want to extend the first one with
 *
 * @example         js
 * import multipleExtends from '@coffeekraken/sugar/js/class/multipleExtends';
 * class MyCoolClass extends multipleExtends(Another, AnotherOne) {
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default (...classes) => {
    return __aggregation(...classes);
};
