// @ts-nocheck
// @shared
/**
 * @name        autoCast
 * @namespace           sugar.js.string
 * @type      Function
 * @stable
 *
 * Auto cast the string into the correct variable type
 *
 * @param    {String}    string    The string to auto cast
 * @return    {Mixed}    The casted value
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import autoCast from '@coffeekraken/sugar/js/string/autoCast'
 * autoCast('12') // => 12
 * autoCast('window.HTMLElement') // => HTMLElement
 * autoCast('{"hello":"world"}') // {hello:'world'}
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function autoCast(string) {
    // if the passed string is not a string, return the value
    if (typeof string !== 'string')
        return string;
    // handle the single quotes strings like '"hello world"'
    if (string.substr(0, 1) === "'" && string.substr(-1) === "'") {
        return string.substr(1, string.length - 2);
    }
    // number
    // before the window check cause window['0'] correspond to something
    const presumedNumber = parseFloat(string);
    if (!isNaN(presumedNumber)) {
        if (presumedNumber.toString() === string) {
            return presumedNumber;
        }
    }
    // avoid getting item from the window object
    if (window[string]) {
        return string;
    }
    // try to eval the passed string
    // if no exception, mean that it's a valid
    // js variable type
    try {
        const obj = eval(`(${string})`);
        return obj;
    }
    catch (e) {
        // assume that the string passed is a string
        return string;
    }
}
export default autoCast;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b0Nhc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdXRvQ2FzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTtBQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQVMsUUFBUSxDQUFDLE1BQU07SUFDdEIseURBQXlEO0lBQ3pELElBQUksT0FBTyxNQUFNLEtBQUssUUFBUTtRQUFFLE9BQU8sTUFBTSxDQUFDO0lBRTlDLHdEQUF3RDtJQUN4RCxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO1FBQzVELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztLQUM1QztJQUVELFNBQVM7SUFDVCxvRUFBb0U7SUFDcEUsTUFBTSxjQUFjLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEVBQUU7UUFDMUIsSUFBSSxjQUFjLENBQUMsUUFBUSxFQUFFLEtBQUssTUFBTSxFQUFFO1lBQ3hDLE9BQU8sY0FBYyxDQUFDO1NBQ3ZCO0tBQ0Y7SUFFRCw0Q0FBNEM7SUFDNUMsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDbEIsT0FBTyxNQUFNLENBQUM7S0FDZjtJQUVELGdDQUFnQztJQUNoQywwQ0FBMEM7SUFDMUMsbUJBQW1CO0lBQ25CLElBQUk7UUFDRixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sR0FBRyxDQUFDO0tBQ1o7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLDRDQUE0QztRQUM1QyxPQUFPLE1BQU0sQ0FBQztLQUNmO0FBQ0gsQ0FBQztBQUNELGVBQWUsUUFBUSxDQUFDIn0=