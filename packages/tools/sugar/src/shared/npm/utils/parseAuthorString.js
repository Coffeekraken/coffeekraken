// @ts-nocheck
/**
 * @name            parseAuthorString
 * @namespace            js.npm
 * @type            Function
 * @platform          js
 * @platform          node
 * @status        beta
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
export default parseAuthorString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VBdXRob3JTdHJpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJzZUF1dGhvclN0cmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJHO0FBQ0gsU0FBUyxpQkFBaUIsQ0FBQyxNQUFNO0lBQzdCLE1BQU0sR0FBRyxHQUFHLDRCQUE0QixDQUFDO0lBQ3pDLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDeEMsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLElBQUksT0FBTyxFQUFFO1FBQ1QsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDWixTQUFTLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN0QztRQUNELElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ1osU0FBUyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDdkM7UUFDRCxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNaLFNBQVMsQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3JDO0tBQ0o7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNyQixDQUFDO0FBQ0QsZUFBZSxpQkFBaUIsQ0FBQyJ9