"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const parseAuthorString_1 = __importDefault(require("./parseAuthorString"));
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
module.exports = standardizeJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhbmRhcmRpemVKc29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RhbmRhcmRpemVKc29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7OztBQUVWLDRFQUFzRDtBQUV0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtDRztBQUNILFNBQVMsZUFBZSxDQUFDLElBQUk7SUFDM0IsU0FBUztJQUNULElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFO1FBQ2xELElBQUksQ0FBQyxNQUFNLEdBQUcsMkJBQW1CLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2hEO1NBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3BELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUN2QyxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtnQkFDOUIsT0FBTywyQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNwQztZQUNELE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxlQUFlO0lBQ2YsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLE9BQU8sSUFBSSxDQUFDLFlBQVksS0FBSyxRQUFRLEVBQUU7UUFDOUQsSUFBSSxDQUFDLFlBQVksR0FBRywyQkFBbUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDNUQ7U0FBTSxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDaEUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ25ELElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO2dCQUM5QixPQUFPLDJCQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3BDO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7S0FDSjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQUNELGlCQUFTLGVBQWUsQ0FBQyJ9