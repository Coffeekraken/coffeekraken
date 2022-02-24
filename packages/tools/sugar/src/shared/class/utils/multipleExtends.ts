// @ts-nocheck

import __aggregation from 'aggregation/es5';

/**
 * @name                multipleExtends
 * @namespace           shared.class.utils
 * @type                Function
 * @platform          js
 * @platform          node
 * @status          alpha
 *
 * This function allows you to extends your class with multiple other ones.
 *
 * @param     {Class}           ...classes          All the classed you want to extend the first one with
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import multipleExtends from '@coffeekraken/sugar/shared/class/utils/multipleExtends';
 * class MyCoolClass extends multipleExtends(Another, AnotherOne) {
 * }
 *
 * @see       https://www.npmjs.com/package/aggregation
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default (...classes) => {
    return __aggregation(...classes);
};
