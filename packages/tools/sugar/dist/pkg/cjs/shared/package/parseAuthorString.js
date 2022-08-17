"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            parseAuthorString
 * @namespace            shared.package
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * This function simply take an author string like "Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)" and
 * transform it into a plain object with these properties: name, email and url
 *
 * @param       {String}          string          The string to parse
 * @return      {Object}                          The plain object version of the string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import parseAuthorString from '@coffeekraken/sugar/shared/package/parseAuthorString';
 * parseAuthorString("Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)")
 * // => {
 *   "name": "Olivier Bossel",
 *   "email": "olivier.bossel@gmail.com",
 *   "url": "https://olivierbossel.com"
 * }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function parseAuthorString(string) {
    const reg = /(.*)\s?<(.*)>\s?\((.*)\)/gm;
    const matches = reg.exec(string.trim());
    const authorObj = {};
    if (matches) {
        if (matches[1]) {
            authorObj.name = matches[1].trim();
        }
        if (matches[2]) {
            authorObj.email = matches[2].trim();
        }
        if (matches[3]) {
            authorObj.url = matches[3].trim();
        }
    }
    return authorObj;
}
exports.default = parseAuthorString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCRztBQUNILFNBQVMsaUJBQWlCLENBQUMsTUFBTTtJQUM3QixNQUFNLEdBQUcsR0FBRyw0QkFBNEIsQ0FBQztJQUN6QyxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUNyQixJQUFJLE9BQU8sRUFBRTtRQUNULElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ1osU0FBUyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDdEM7UUFDRCxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNaLFNBQVMsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3ZDO1FBQ0QsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDWixTQUFTLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNyQztLQUNKO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQztBQUNELGtCQUFlLGlCQUFpQixDQUFDIn0=