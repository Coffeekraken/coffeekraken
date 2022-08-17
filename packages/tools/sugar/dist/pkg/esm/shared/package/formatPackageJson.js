// @ts-nocheck
import __parseAuthorString from './parseAuthorString';
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
 * @example       js
 * import formatPackageJson from '@coffeekraken/sugar/shared/package/formatPackageJson';
 * formatPackageJson({
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
function formatPackageJson(json) {
    // author
    if (json.author && typeof json.author === 'string') {
        json.author = __parseAuthorString(json.author);
    }
    else if (json.author && Array.isArray(json.author)) {
        json.author = json.author.map((string) => {
            if (typeof string === 'string') {
                return __parseAuthorString(string);
            }
            return string;
        });
    }
    // contributors
    if (json.contributors && typeof json.contributors === 'string') {
        json.contributors = __parseAuthorString(json.contributors);
    }
    else if (json.contributors && Array.isArray(json.contributors)) {
        json.contributors = json.contributors.map((string) => {
            if (typeof string === 'string') {
                return __parseAuthorString(string);
            }
            return string;
        });
    }
    return json;
}
export default formatPackageJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLG1CQUFtQixNQUFNLHFCQUFxQixDQUFDO0FBRXREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQ0c7QUFDSCxTQUFTLGlCQUFpQixDQUFDLElBQUk7SUFDM0IsU0FBUztJQUNULElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFO1FBQ2hELElBQUksQ0FBQyxNQUFNLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2xEO1NBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ2xELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNyQyxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtnQkFDNUIsT0FBTyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN0QztZQUNELE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxDQUFDO0tBQ047SUFFRCxlQUFlO0lBQ2YsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLE9BQU8sSUFBSSxDQUFDLFlBQVksS0FBSyxRQUFRLEVBQUU7UUFDNUQsSUFBSSxDQUFDLFlBQVksR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDOUQ7U0FBTSxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDOUQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ2pELElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO2dCQUM1QixPQUFPLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3RDO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7S0FDTjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFDRCxlQUFlLGlCQUFpQixDQUFDIn0=