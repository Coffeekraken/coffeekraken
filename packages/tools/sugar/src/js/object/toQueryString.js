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
    return toQueryString;
});
//# sourceMappingURL=toQueryString.js.map