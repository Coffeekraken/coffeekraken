// @ts-nocheck
/**
 * @name        uncamelize
 * @namespace            js.string
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Uncamelize a string
 *
 * @param    {String}    string    The string to uncamelize
 * @param    {String}    [separator='-']    The separator to use
 * @return    {String}    The uncamelized string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example    js
 * import uncamelize from '@coffeekraken/sugar/js/string/uncamelize'
 * uncamelize('helloWorldAndUniverse') // hello-world-and-universe
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function uncamelize(text, separator = '-') {
    // Replace all capital letters by separator followed by lowercase one
    let res = '';
    res = text.replace(/[A-Z]/g, function (letter) {
        return separator + letter.toLowerCase();
    });
    // Remove first separator (to avoid _hello_world name)
    if (res.slice(0, 1) === separator)
        res = res.slice(1);
    return res;
}
export default uncamelize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxVQUFVLENBQUMsSUFBSSxFQUFFLFNBQVMsR0FBRyxHQUFHO0lBQ3JDLHFFQUFxRTtJQUNyRSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDYixHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsVUFBVSxNQUFNO1FBQ3pDLE9BQU8sU0FBUyxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM1QyxDQUFDLENBQUMsQ0FBQztJQUVILHNEQUFzRDtJQUN0RCxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLFNBQVM7UUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV0RCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFDRCxlQUFlLFVBQVUsQ0FBQyJ9