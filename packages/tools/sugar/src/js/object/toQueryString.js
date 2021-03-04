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
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @name        toQueryString
     * @namespace           sugar.js.object
     * @type      Function
     * @stable
     *
     * Transform an object (key => pairs) to a query string like "?var1=value1&var2"
     *
     * @param 		{Object} 		obj 		The object to serialize
     * @return 		{String} 					The query string
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 	js
     * import toQueryString from '@coffeekraken/sugar/js/object/toQueryString'
     * console.log(toQueryString({
     * 	value1 : 'coco',
     * 	value1 : 'plop'
     * }));
     * // => ?value1=coco&value2=plop
     *
     * @since       2.0.0
     * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function toQueryString(obj) {
        return ('?' +
            Object.keys(obj)
                .reduce(function (a, k) {
                a.push(k + '=' + encodeURIComponent(obj[k]));
                return a;
            }, [])
                .join('&'));
    }
    exports.default = toQueryString;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9RdWVyeVN0cmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRvUXVlcnlTdHJpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7OztJQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUJHO0lBQ0gsU0FBUyxhQUFhLENBQUMsR0FBRztRQUN4QixPQUFPLENBQ0wsR0FBRztZQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2lCQUNiLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO2dCQUNwQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0MsT0FBTyxDQUFDLENBQUM7WUFDWCxDQUFDLEVBQUUsRUFBRSxDQUFDO2lCQUNMLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FDYixDQUFDO0lBQ0osQ0FBQztJQUNELGtCQUFlLGFBQWEsQ0FBQyJ9