// @ts-nocheck
/**
 * @name        autoCast
 * @namespace            js.string
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
    try {
        if (window[string]) {
            return string;
        }
    }
    catch (e) { }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQVMsUUFBUSxDQUFDLE1BQU07SUFDcEIseURBQXlEO0lBQ3pELElBQUksT0FBTyxNQUFNLEtBQUssUUFBUTtRQUFFLE9BQU8sTUFBTSxDQUFDO0lBRTlDLHdEQUF3RDtJQUN4RCxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO1FBQzFELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztLQUM5QztJQUVELFNBQVM7SUFDVCxvRUFBb0U7SUFDcEUsTUFBTSxjQUFjLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEVBQUU7UUFDeEIsSUFBSSxjQUFjLENBQUMsUUFBUSxFQUFFLEtBQUssTUFBTSxFQUFFO1lBQ3RDLE9BQU8sY0FBYyxDQUFDO1NBQ3pCO0tBQ0o7SUFFRCw0Q0FBNEM7SUFDNUMsSUFBSTtRQUNBLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2hCLE9BQU8sTUFBTSxDQUFDO1NBQ2pCO0tBQ0o7SUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO0lBRWQsZ0NBQWdDO0lBQ2hDLDBDQUEwQztJQUMxQyxtQkFBbUI7SUFDbkIsSUFBSTtRQUNBLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDaEMsT0FBTyxHQUFHLENBQUM7S0FDZDtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1IsNENBQTRDO1FBQzVDLE9BQU8sTUFBTSxDQUFDO0tBQ2pCO0FBQ0wsQ0FBQztBQUNELGVBQWUsUUFBUSxDQUFDIn0=