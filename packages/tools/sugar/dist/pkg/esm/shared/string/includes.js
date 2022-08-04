// @ts-nocheck
/**
 * @name        includes
 * @namespace            js.string
 * @type      Function
 * @platform          js
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function includes(string, values) {
    if (!Array.isArray(values))
        values = values.split(',').map((t) => t.trim());
    const valuesThatExists = [];
    values.forEach((v) => {
        if (string.includes(v)) {
            valuesThatExists.push(v);
        }
    });
    if (valuesThatExists.length)
        return valuesThatExists;
    return false;
}
export default includes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQVMsUUFBUSxDQUFDLE1BQU0sRUFBRSxNQUFNO0lBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUFFLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDNUUsTUFBTSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7SUFDNUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ2pCLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNwQixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDNUI7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILElBQUksZ0JBQWdCLENBQUMsTUFBTTtRQUFFLE9BQU8sZ0JBQWdCLENBQUM7SUFDckQsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQUNELGVBQWUsUUFBUSxDQUFDIn0=