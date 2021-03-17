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
     * @name        uncamelize
     * @namespace           sugar.js.string
     * @type      Function
     * @stable
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
     * @example    js
     * import uncamelize from '@coffeekraken/sugar/js/string/uncamelize'
     * uncamelize('helloWorldAndUniverse') // hello-world-and-universe
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function uncamelize(text, separator) {
        if (separator === void 0) { separator = '-'; }
        // Replace all capital letters by separator followed by lowercase one
        var res = '';
        res = text.replace(/[A-Z]/g, function (letter) {
            return separator + letter.toLowerCase();
        });
        // Remove first separator (to avoid _hello_world name)
        if (res.slice(0, 1) === separator)
            res = res.slice(1);
        return res;
    }
    exports.default = uncamelize;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5jYW1lbGl6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zaGFyZWQvc3RyaW5nL3VuY2FtZWxpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7OztJQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bc0JHO0lBQ0gsU0FBUyxVQUFVLENBQUMsSUFBSSxFQUFFLFNBQWU7UUFBZiwwQkFBQSxFQUFBLGVBQWU7UUFDdkMscUVBQXFFO1FBQ3JFLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFVLE1BQU07WUFDM0MsT0FBTyxTQUFTLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO1FBRUgsc0RBQXNEO1FBQ3RELElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssU0FBUztZQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXRELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUNELGtCQUFlLFVBQVUsQ0FBQyJ9