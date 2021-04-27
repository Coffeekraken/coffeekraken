// @ts-nocheck
/**
 * @name        isUrl
 * @namespace            js.is
 * @type      Function
 * @status              beta
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
 * import isUrl from '@coffeekraken/sugar/js/is/url';
 * isUrl('http://google.com') => true
 * isUrl('ftp://web.coco.com:2222') => true
 * isUrl('hello') => false
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isUrl(data) {
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
export default isUrl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL3NoYXJlZC9pcy91cmwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQVMsS0FBSyxDQUFDLElBQUk7SUFDakIsTUFBTSxRQUFRLEdBQ1osa0NBQWtDO1FBQ2xDLDBEQUEwRCxHQUFHLFdBQVc7UUFDeEUsNkJBQTZCLEdBQUcsMkJBQTJCO1FBQzNELEdBQUcsR0FBRyxrQkFBa0I7UUFDeEIsdUJBQXVCLEdBQUcsV0FBVztRQUNyQyxxQ0FBcUMsR0FBRyxPQUFPO1FBQy9DLGFBQWEsR0FBRyxzQ0FBc0M7UUFDdEQsZ0JBQWdCLEdBQUcsVUFBVTtRQUM3QixRQUFRLEdBQUcsa0RBQWtEO1FBQzdELHVDQUF1QyxDQUFDO0lBQzFDLE1BQU0sRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2QixDQUFDO0FBQ0QsZUFBZSxLQUFLLENBQUMifQ==