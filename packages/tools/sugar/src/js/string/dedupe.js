// @ts-nocheck
// @shared
import __toRegex from 'to-regex';
/**
 * @name        dedupe
 * @namespace   sugar.js.string
 * @type        Function
 * @stable
 *
 * This function simple make sure that you don't have duplicate statements in the passed string
 *
 * @param           {String}        string        The string to process
 * @param           {String}        statement       The statement to check
 * @return          {String}                      The deduplicated string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import dedupe from '@coffeekraken/sugar/js/string/dedupe';
 * dedupe('hello world hello your', 'hello'); // => hello world your
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function dedupe(str, statement) {
    const reg = __toRegex(`(${statement})`, {
        contains: true,
        flags: 'g'
    });
    return str
        .split(reg)
        .reverse()
        .filter(function (e, i, arr) {
        return arr.indexOf(e, i + 1) === -1;
    })
        .reverse()
        .join('');
}
export default dedupe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVkdXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVkdXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVYsT0FBTyxTQUFTLE1BQU0sVUFBVSxDQUFDO0FBRWpDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBUyxNQUFNLENBQUMsR0FBRyxFQUFFLFNBQVM7SUFDNUIsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLElBQUksU0FBUyxHQUFHLEVBQUU7UUFDdEMsUUFBUSxFQUFFLElBQUk7UUFDZCxLQUFLLEVBQUUsR0FBRztLQUNYLENBQUMsQ0FBQztJQUNILE9BQU8sR0FBRztTQUNQLEtBQUssQ0FBQyxHQUFHLENBQUM7U0FDVixPQUFPLEVBQUU7U0FDVCxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUc7UUFDekIsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDO1NBQ0QsT0FBTyxFQUFFO1NBQ1QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2QsQ0FBQztBQUNELGVBQWUsTUFBTSxDQUFDIn0=