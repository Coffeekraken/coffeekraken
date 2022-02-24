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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b0Nhc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdXRvQ2FzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxTQUFTLFFBQVEsQ0FBQyxNQUFNO0lBQ3BCLHlEQUF5RDtJQUN6RCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVE7UUFBRSxPQUFPLE1BQU0sQ0FBQztJQUU5Qyx3REFBd0Q7SUFDeEQsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtRQUMxRCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDOUM7SUFFRCxTQUFTO0lBQ1Qsb0VBQW9FO0lBQ3BFLE1BQU0sY0FBYyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUFFO1FBQ3hCLElBQUksY0FBYyxDQUFDLFFBQVEsRUFBRSxLQUFLLE1BQU0sRUFBRTtZQUN0QyxPQUFPLGNBQWMsQ0FBQztTQUN6QjtLQUNKO0lBRUQsNENBQTRDO0lBQzVDLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ2hCLE9BQU8sTUFBTSxDQUFDO0tBQ2pCO0lBRUQsZ0NBQWdDO0lBQ2hDLDBDQUEwQztJQUMxQyxtQkFBbUI7SUFDbkIsSUFBSTtRQUNBLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDaEMsT0FBTyxHQUFHLENBQUM7S0FDZDtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1IsNENBQTRDO1FBQzVDLE9BQU8sTUFBTSxDQUFDO0tBQ2pCO0FBQ0wsQ0FBQztBQUNELGVBQWUsUUFBUSxDQUFDIn0=