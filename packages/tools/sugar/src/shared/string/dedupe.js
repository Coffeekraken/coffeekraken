// @ts-nocheck
import __toRegex from 'to-regex';
/**
 * @name        dedupe
 * @namespace            js.string
 * @type        Function
 * @platform          js
 * @platform          node
 * @status        beta
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
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function dedupe(str, statement) {
    const reg = __toRegex(`(${statement})`, {
        contains: true,
        flags: 'g',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVkdXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVkdXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFNBQVMsTUFBTSxVQUFVLENBQUM7QUFFakM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILFNBQVMsTUFBTSxDQUFDLEdBQUcsRUFBRSxTQUFTO0lBQzFCLE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQyxJQUFJLFNBQVMsR0FBRyxFQUFFO1FBQ3BDLFFBQVEsRUFBRSxJQUFJO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDYixDQUFDLENBQUM7SUFDSCxPQUFPLEdBQUc7U0FDTCxLQUFLLENBQUMsR0FBRyxDQUFDO1NBQ1YsT0FBTyxFQUFFO1NBQ1QsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHO1FBQ3ZCLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUMsQ0FBQztTQUNELE9BQU8sRUFBRTtTQUNULElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNsQixDQUFDO0FBQ0QsZUFBZSxNQUFNLENBQUMifQ==