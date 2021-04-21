// @ts-nocheck
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
     * @namespace            js.object
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9RdWVyeVN0cmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRvUXVlcnlTdHJpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7O0lBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5Qkc7SUFDSCxTQUFTLGFBQWEsQ0FBQyxHQUFHO1FBQ3hCLE9BQU8sQ0FDTCxHQUFHO1lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7aUJBQ2IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7Z0JBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxPQUFPLENBQUMsQ0FBQztZQUNYLENBQUMsRUFBRSxFQUFFLENBQUM7aUJBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUNiLENBQUM7SUFDSixDQUFDO0lBQ0Qsa0JBQWUsYUFBYSxDQUFDIn0=