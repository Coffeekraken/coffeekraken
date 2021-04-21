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
     * @name            parseAuthorString
     * @namespace            js.npm
     * @type            Function
     * @stable
     *
     * This function simply take an author string like "Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)" and
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
     * import parseAuthorString from '@coffeekraken/sugar/js/npm/utils/parseAuthorString';
     * parseAuthorString("Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)")
     * // => {
     *   "name": "Olivier Bossel",
     *   "email": "olivier.bossel@gmail.com",
     *   "url": "https://olivierbossel.com"
     * }
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VBdXRob3JTdHJpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJzZUF1dGhvclN0cmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7SUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMkJHO0lBQ0gsU0FBUyxpQkFBaUIsQ0FBQyxNQUFNO1FBQy9CLE1BQU0sR0FBRyxHQUFHLDRCQUE0QixDQUFDO1FBQ3pDLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDeEMsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksT0FBTyxFQUFFO1lBQ1gsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2QsU0FBUyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDcEM7WUFDRCxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDZCxTQUFTLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNyQztZQUNELElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNkLFNBQVMsQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ25DO1NBQ0Y7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBQ0Qsa0JBQWUsaUJBQWlCLENBQUMifQ==