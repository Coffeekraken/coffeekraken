// @ts-nocheck
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
 * @example 	js
 * import { __isUrl } from '@coffeekraken/sugar/is';
 * __isUrl('http://google.com') => true
 * __isUrl('ftp://web.coco.com:2222') => true
 * __isUrl('hello') => false
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __isUrl(data) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsT0FBTyxDQUFDLElBQUk7SUFDaEMsTUFBTSxRQUFRLEdBQ1Ysa0NBQWtDO1FBQ2xDLDBEQUEwRCxHQUFHLFdBQVc7UUFDeEUsNkJBQTZCLEdBQUcsMkJBQTJCO1FBQzNELEdBQUcsR0FBRyxrQkFBa0I7UUFDeEIsdUJBQXVCLEdBQUcsV0FBVztRQUNyQyxxQ0FBcUMsR0FBRyxPQUFPO1FBQy9DLGFBQWEsR0FBRyxzQ0FBc0M7UUFDdEQsZ0JBQWdCLEdBQUcsVUFBVTtRQUM3QixRQUFRLEdBQUcsa0RBQWtEO1FBQzdELHVDQUF1QyxDQUFDO0lBQzVDLE1BQU0sRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QixDQUFDIn0=