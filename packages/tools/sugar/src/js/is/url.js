// @ts-nocheck
// @shared
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @name        isUrl
     * @namespace           sugar.js.is
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
        var strRegex = '^((https|http|ftp|rtsp|mms)?://)' +
            "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + //ftp的user@
            '(([0-9]{1,3}.){3}[0-9]{1,3}' + // IP形式的URL- 199.194.52.184
            '|' + // 允许IP和DOMAIN（域名）
            "([0-9a-z_!~*'()-]+.)*" + // 域名- www.
            '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' + // 二级域名
            '[a-z]{2,6})' + // first level domain- .com or .museum
            '(:[0-9]{1,4})?' + // 端口- :80
            '((/?)|' + // a slash isn't required if there is no file name
            "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
        var re = new RegExp(strRegex);
        return re.test(data);
    }
    return isUrl;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7OztJQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXVCRztJQUNILFNBQVMsS0FBSyxDQUFDLElBQUk7UUFDakIsSUFBTSxRQUFRLEdBQ1osa0NBQWtDO1lBQ2xDLDBEQUEwRCxHQUFHLFdBQVc7WUFDeEUsNkJBQTZCLEdBQUcsMkJBQTJCO1lBQzNELEdBQUcsR0FBRyxrQkFBa0I7WUFDeEIsdUJBQXVCLEdBQUcsV0FBVztZQUNyQyxxQ0FBcUMsR0FBRyxPQUFPO1lBQy9DLGFBQWEsR0FBRyxzQ0FBc0M7WUFDdEQsZ0JBQWdCLEdBQUcsVUFBVTtZQUM3QixRQUFRLEdBQUcsa0RBQWtEO1lBQzdELHVDQUF1QyxDQUFDO1FBQzFDLElBQU0sRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBQ0QsT0FBUyxLQUFLLENBQUMifQ==