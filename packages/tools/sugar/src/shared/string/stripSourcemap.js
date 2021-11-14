/**
 * @name            stripSourcemap
 * @namespace       shared.string
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This function simply take a string and get rid of all sourcemap
 *
 * @feature        Support sourcemap like `//# sourceMappingURL=...`
 *
 * @param       {String}            str         The string to process
 * @return      {String}                        The processed string
 *
 * @example         js
 * import __stripSourcemap from '@coffeekraken/sugar/shared/string/stripSourcemap';
 * __stripSourcemap('...');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function stripSourcemap(str) {
    str = str.replace(/\/\/#\s?sourceMappingURL=[\w\W]+/gm, '');
    return str;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXBTb3VyY2VtYXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdHJpcFNvdXJjZW1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxjQUFjLENBQUMsR0FBVztJQUM5QyxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxvQ0FBb0MsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM1RCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUMifQ==