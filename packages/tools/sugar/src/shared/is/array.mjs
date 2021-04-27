// @ts-nocheck
/**
 * @name        isArray
 * @namespace            js.is
 * @type      Function
 * @stable
 *
 * Check if the passed value is a js Array
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a Array, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import isArray from '@coffeekraken/sugar/js/is/array'
 * if (isArray([]) {
 *   // do something
 * }
 *
 * @since      1.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isArray(value) {
    return value && typeof value === 'object' && value.constructor === Array;
}
export default isArray;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvc2hhcmVkL2lzL2FycmF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUFTLE9BQU8sQ0FBQyxLQUFLO0lBQ3BCLE9BQU8sS0FBSyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsV0FBVyxLQUFLLEtBQUssQ0FBQztBQUMzRSxDQUFDO0FBQ0QsZUFBZSxPQUFPLENBQUMifQ==