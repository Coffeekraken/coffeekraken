"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        camelize
 * @namespace            js.string
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Camelize a string
 *
 * @param         {String}          text        The string to camelize
 * @return        {String}                      The camelized string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import camelize from '@coffeekraken/sugar/js/string/camelize';
 * camelize('hello world'); // => helloWorld
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function camelize(text) {
    if (!text)
        text = '';
    let res = '';
    const reg = /(?:^|[_-\s])(\w)/g;
    res = text.replace(reg, function (_, c) {
        return c ? c.toUpperCase() : '';
    });
    res = res.substr(0, 1).toLowerCase() + res.slice(1);
    return res.trim();
}
exports.default = camelize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQVMsUUFBUSxDQUFDLElBQUk7SUFDbEIsSUFBSSxDQUFDLElBQUk7UUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNiLE1BQU0sR0FBRyxHQUFHLG1CQUFtQixDQUFDO0lBQ2hDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFDO1FBQ2xDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNwQyxDQUFDLENBQUMsQ0FBQztJQUNILEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BELE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3RCLENBQUM7QUFDRCxrQkFBZSxRQUFRLENBQUMifQ==