// @ts-nocheck
// @shared
import __aggregation from 'aggregation/es5';
/**
 * @name                multipleExtends
 * @namespace           sugar.js.class
 * @type                Function
 * @stable
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
 * import multipleExtends from '@coffeekraken/sugar/js/class/multipleExtends';
 * class MyCoolClass extends multipleExtends(Another, AnotherOne) {
 * }
 *
 * @see       https://www.npmjs.com/package/aggregation
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default (...classes) => {
    return __aggregation(...classes);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlwbGVFeHRlbmRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibXVsdGlwbGVFeHRlbmRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVYsT0FBTyxhQUFhLE1BQU0saUJBQWlCLENBQUM7QUFFNUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxlQUFlLENBQUMsR0FBRyxPQUFPLEVBQUUsRUFBRTtJQUM1QixPQUFPLGFBQWEsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDO0FBQ25DLENBQUMsQ0FBQyJ9