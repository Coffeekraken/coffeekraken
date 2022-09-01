import __dashCase from './dashCase';
// @ts-nocheck
/**
 * @name        snakeCase
 * @namespace            js.string
 * @type      Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * snakeCase a string
 *
 * @param         {String}          text        The string to snakeCase
 * @return        {String}                      The snakeCased string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import snakeCase from '@coffeekraken/sugar/js/string/snakeCase';
 * snakeCase('hello world'); // => hello_world
 *
 * @see             https://www.npmjs.com/package/param-case
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function snakeCase(text) {
    const dashCase = __dashCase(text);
    return dashCase.replace(/\-/g, '_');
}
export default snakeCase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLFlBQVksQ0FBQztBQUVwQyxjQUFjO0FBQ2Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILFNBQVMsU0FBUyxDQUFDLElBQUk7SUFDbkIsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDeEMsQ0FBQztBQUNELGVBQWUsU0FBUyxDQUFDIn0=