"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseAuthorString_1 = __importDefault(require("./parseAuthorString"));
/**
 * @name            formatPackageJson
 * @namespace            shared.package
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
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
 * @snippet         __formatPackageJson($1)
 *
 * @example       js
 * import { __formatPackageJson } from '@coffeekraken/sugar/package';
 * __formatPackageJson({
 *    "author": "Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)"
 * }); // => {
 *    "author": {
 *      "name": "Olivier Bossel",
 *      "email": "olivier.bossel@gmail.com",
 *      "url": "https://olivierbossel.com"
 *    }
 * }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __formatPackageJson(json) {
    // author
    if (json.author && typeof json.author === 'string') {
        json.author = (0, parseAuthorString_1.default)(json.author);
    }
    else if (json.author && Array.isArray(json.author)) {
        json.author = json.author.map((string) => {
            if (typeof string === 'string') {
                return (0, parseAuthorString_1.default)(string);
            }
            return string;
        });
    }
    // contributors
    if (json.contributors && typeof json.contributors === 'string') {
        json.contributors = (0, parseAuthorString_1.default)(json.contributors);
    }
    else if (json.contributors && Array.isArray(json.contributors)) {
        json.contributors = json.contributors.map((string) => {
            if (typeof string === 'string') {
                return (0, parseAuthorString_1.default)(string);
            }
            return string;
        });
    }
    return json;
}
exports.default = __formatPackageJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRFQUFzRDtBQUV0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQ0c7QUFDSCxTQUF3QixtQkFBbUIsQ0FBQyxJQUFJO0lBQzVDLFNBQVM7SUFDVCxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBRTtRQUNoRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUEsMkJBQW1CLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2xEO1NBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ2xELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNyQyxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtnQkFDNUIsT0FBTyxJQUFBLDJCQUFtQixFQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3RDO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7S0FDTjtJQUVELGVBQWU7SUFDZixJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksT0FBTyxJQUFJLENBQUMsWUFBWSxLQUFLLFFBQVEsRUFBRTtRQUM1RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUEsMkJBQW1CLEVBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQzlEO1NBQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQzlELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNqRCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtnQkFDNUIsT0FBTyxJQUFBLDJCQUFtQixFQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3RDO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7S0FDTjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUExQkQsc0NBMEJDIn0=