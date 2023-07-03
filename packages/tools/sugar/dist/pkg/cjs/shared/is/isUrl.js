"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name        isUrl
 * @namespace            shared.is
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Check if the passed value is a valid url
 *
 * @param 		{Mixed} 		value 		The value to check
 * @return 		{Boolean} 					The check result
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __isUrl($1)
 *
 * @example 	js
 * import { __isUrl } from '@coffeekraken/sugar/is';
 * __isUrl('http://google.com') => true
 * __isUrl('ftp://web.coco.com:2222') => true
 * __isUrl('hello') => false
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __isUrl(data) {
    const strRegex = '^((https|http|ftp|rtsp|mms)?://)' +
        "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + //ftp的user@
        '(([0-9]{1,3}.){3}[0-9]{1,3}' + // IP形式的URL- 199.194.52.184
        '|' + // 允许IP和DOMAIN（域名）
        "([0-9a-z_!~*'()-]+.)*" + // 域名- www.
        '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' + // 二级域名
        '[a-z]{2,6})' + // first level domain- .com or .museum
        '(:[0-9]{1,4})?' + // 端口- :80
        '((/?)|' + // a slash isn't required if there is no file name
        "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    const re = new RegExp(strRegex);
    return re.test(data);
}
exports.default = __isUrl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxTQUF3QixPQUFPLENBQUMsSUFBSTtJQUNoQyxNQUFNLFFBQVEsR0FDVixrQ0FBa0M7UUFDbEMsMERBQTBELEdBQUcsV0FBVztRQUN4RSw2QkFBNkIsR0FBRywyQkFBMkI7UUFDM0QsR0FBRyxHQUFHLGtCQUFrQjtRQUN4Qix1QkFBdUIsR0FBRyxXQUFXO1FBQ3JDLHFDQUFxQyxHQUFHLE9BQU87UUFDL0MsYUFBYSxHQUFHLHNDQUFzQztRQUN0RCxnQkFBZ0IsR0FBRyxVQUFVO1FBQzdCLFFBQVEsR0FBRyxrREFBa0Q7UUFDN0QsdUNBQXVDLENBQUM7SUFDNUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pCLENBQUM7QUFkRCwwQkFjQyJ9