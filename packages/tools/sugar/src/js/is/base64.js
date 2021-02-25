// @ts-nocheck
// @shared
/**
 * @name        isBase64
 * @namespace           sugar.js.is
 * @type      Function
 * @stable
 *
 * Check if the passed value is a base 64 string
 *
 * @param    {Mixed}    value    The value to check
 * @return   {Boolean}   true if it's a Boolean, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import isBase64 from '@coffeekraken/sugar/js/is/base64'
 * if (isBase64(true) {
 *   // do something
 * }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isBase64(value) {
    if (typeof value !== 'string')
        return false;
    if (value === '' || value.trim() === '')
        return false;
    const reg = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    return reg.test(value);
}
export default isBase64;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZTY0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFzZTY0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBUyxRQUFRLENBQUMsS0FBSztJQUNyQixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUM1QyxJQUFJLEtBQUssS0FBSyxFQUFFLElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUN0RCxNQUFNLEdBQUcsR0FBRyxrRUFBa0UsQ0FBQztJQUMvRSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekIsQ0FBQztBQUNELGVBQWUsUUFBUSxDQUFDIn0=