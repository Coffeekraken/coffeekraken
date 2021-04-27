// @ts-nocheck
import __aggregation from 'aggregation/es5';
/**
 * @name                multipleExtends
 * @namespace           shared.class.utils
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
 * import multipleExtends from '@coffeekraken/sugar/shared/class/utils/multipleExtends';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlwbGVFeHRlbmRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL3NoYXJlZC9jbGFzcy91dGlscy9tdWx0aXBsZUV4dGVuZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sYUFBYSxNQUFNLGlCQUFpQixDQUFDO0FBRTVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsZUFBZSxDQUFDLEdBQUcsT0FBTyxFQUFFLEVBQUU7SUFDNUIsT0FBTyxhQUFhLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztBQUNuQyxDQUFDLENBQUMifQ==