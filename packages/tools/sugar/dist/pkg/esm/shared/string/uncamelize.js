// @ts-nocheck
/**
 * @name        uncamelize
 * @namespace            shared.string
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
 * @snippet         __uncamelize($1)
 *
 * @example    js
 * import { __uncamelize } from '@coffeekraken/sugar/string'
 * __uncamelize('helloWorldAndUniverse') // hello-world-and-universe
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __uncamelize(text, separator = '-') {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLFlBQVksQ0FBQyxJQUFJLEVBQUUsU0FBUyxHQUFHLEdBQUc7SUFDdEQscUVBQXFFO0lBQ3JFLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNiLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFVLE1BQU07UUFDekMsT0FBTyxTQUFTLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzVDLENBQUMsQ0FBQyxDQUFDO0lBRUgsc0RBQXNEO0lBQ3RELElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssU0FBUztRQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXRELE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQyJ9