// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./parseAuthorString"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const parseAuthorString_1 = __importDefault(require("./parseAuthorString"));
    /**
     * @name            standardizeJson
     * @namespace       sugar.js.npm
     * @type            Function
     * @status              beta
     *
     * This function simply take a package.json JSON formatted object and standardize
     * some fields like the "author" one to be sure it is an object at the end,
     * the "contributors" array the same way as the "author" one, etc... Here's the list
     * of processed actions:
     * 1. Transform the string version of the "author" field into an object with the properties "name", "email" and "url"
     * 2. Transform the string version of the "contributors" field into an object with the properties "name", "email" and "url"
     *
     * @param       {Object}        json        The json to process
     * @return      {Object}                    The standardized json
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import standardizeJson from '@coffeekraken/sugar/js/npm/utils/standardizeJson';
     * standardizeJson({
     *    "author": "Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)"
     * }); // => {
     *    "author": {
     *      "name": "Olivier Bossel",
     *      "email": "olivier.bossel@gmail.com",
     *      "url": "https://olivierbossel.com"
     *    }
     * }
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function standardizeJson(json) {
        // author
        if (json.author && typeof json.author === 'string') {
            json.author = parseAuthorString_1.default(json.author);
        }
        else if (json.author && Array.isArray(json.author)) {
            json.author = json.author.map((string) => {
                if (typeof string === 'string') {
                    return parseAuthorString_1.default(string);
                }
                return string;
            });
        }
        // contributors
        if (json.contributors && typeof json.contributors === 'string') {
            json.contributors = parseAuthorString_1.default(json.contributors);
        }
        else if (json.contributors && Array.isArray(json.contributors)) {
            json.contributors = json.contributors.map((string) => {
                if (typeof string === 'string') {
                    return parseAuthorString_1.default(string);
                }
                return string;
            });
        }
        return json;
    }
    exports.default = standardizeJson;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhbmRhcmRpemVKc29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RhbmRhcmRpemVKc29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFFViw0RUFBc0Q7SUFFdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FrQ0c7SUFDSCxTQUFTLGVBQWUsQ0FBQyxJQUFJO1FBQzNCLFNBQVM7UUFDVCxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUNsRCxJQUFJLENBQUMsTUFBTSxHQUFHLDJCQUFtQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNoRDthQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNwRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQ3ZDLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO29CQUM5QixPQUFPLDJCQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNwQztnQkFDRCxPQUFPLE1BQU0sQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQztTQUNKO1FBRUQsZUFBZTtRQUNmLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxPQUFPLElBQUksQ0FBQyxZQUFZLEtBQUssUUFBUSxFQUFFO1lBQzlELElBQUksQ0FBQyxZQUFZLEdBQUcsMkJBQW1CLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzVEO2FBQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ2hFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDbkQsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7b0JBQzlCLE9BQU8sMkJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ3BDO2dCQUNELE9BQU8sTUFBTSxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCxrQkFBZSxlQUFlLENBQUMifQ==