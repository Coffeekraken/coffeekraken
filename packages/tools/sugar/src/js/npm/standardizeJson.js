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
    var parseAuthorString_1 = __importDefault(require("./parseAuthorString"));
    /**
     * @name            standardizeJson
     * @namespace       sugar.js.npm
     * @type            Function
     * @beta
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
     * import standardizeJson from '@coffeekraken/sugar/js/npm/standardizeJson';
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
            json.author = json.author.map(function (string) {
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
            json.contributors = json.contributors.map(function (string) {
                if (typeof string === 'string') {
                    return parseAuthorString_1.default(string);
                }
                return string;
            });
        }
        return json;
    }
    return standardizeJson;
});
