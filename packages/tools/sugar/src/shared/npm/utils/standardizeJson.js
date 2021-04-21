// @ts-nocheck
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
     * @namespace            js.npm
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
     * @param       {Object}        json        The json to process
     * @return      {Object}                    The standardized json
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhbmRhcmRpemVKc29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RhbmRhcmRpemVKc29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDRFQUFzRDtJQUV0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtDRztJQUNILFNBQVMsZUFBZSxDQUFDLElBQUk7UUFDM0IsU0FBUztRQUNULElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQ2xELElBQUksQ0FBQyxNQUFNLEdBQUcsMkJBQW1CLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2hEO2FBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3BELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDdkMsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7b0JBQzlCLE9BQU8sMkJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ3BDO2dCQUNELE9BQU8sTUFBTSxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxlQUFlO1FBQ2YsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLE9BQU8sSUFBSSxDQUFDLFlBQVksS0FBSyxRQUFRLEVBQUU7WUFDOUQsSUFBSSxDQUFDLFlBQVksR0FBRywyQkFBbUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDNUQ7YUFBTSxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDaEUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUNuRCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtvQkFDOUIsT0FBTywyQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDcEM7Z0JBQ0QsT0FBTyxNQUFNLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELGtCQUFlLGVBQWUsQ0FBQyJ9