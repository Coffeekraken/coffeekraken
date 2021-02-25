// @ts-nocheck
// @shared
import __deepMerge from '../object/deepMerge';
import __stripCssComments from 'strip-css-comments';
/**
 * @name          stripCssComments
 * @namespace     sugar.js.css
 * @type          Function
 * @status              wip
 *
 * This function simply remove all the css comments like:
 * - Multiline blocks css comments begining with /* *, ending with * /
 * - Single line comments begining with //
 *
 * @param       {String}        css         The css code to process
 * @param       {Object}      [settings={}]   An object of settings
 * @return      {String}                    The processed css code
 *
 * @setting     {Boolean}     [block=true]       Remove the blocks comments
 * @setting     {Boolean}     [line=true]       Remove the line comments
 *
 * @todo        tests
 * @todo        interface
 * @todo        doc
 *
 * @example       js
 * import stripCssComments from '@coffeekraken/sugar/js/css/stripCssComments';
 * stripCssComments(`
 * // something cool
 * body { background-color: red; }
 * `);
 * // body { background-color: red }
 *
 * @see         https://www.npmjs.com/package/strip-css-comments
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function stripCssComments(css, settings = {}) {
    settings = __deepMerge({
        block: true,
        line: true
    }, settings);
    if (settings.block) {
        // css = css.replace(/\/\*{2}([\s\S]+?)\*\//g, '');
        css = __stripCssComments(css, {
            preserve: false
        });
    }
    if (settings.line) {
        css = css.replace(/^[\s]{0,99999999}\/\/.*$/gm, '');
    }
    return css;
}
export default stripCssComments;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXBDc3NDb21tZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0cmlwQ3NzQ29tbWVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7QUFFVixPQUFPLFdBQVcsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLGtCQUFrQixNQUFNLG9CQUFvQixDQUFDO0FBRXBEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdDRztBQUNILFNBQVMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQzFDLFFBQVEsR0FBRyxXQUFXLENBQ3BCO1FBQ0UsS0FBSyxFQUFFLElBQUk7UUFDWCxJQUFJLEVBQUUsSUFBSTtLQUNYLEVBQ0QsUUFBUSxDQUNULENBQUM7SUFDRixJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7UUFDbEIsbURBQW1EO1FBQ25ELEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUU7WUFDNUIsUUFBUSxFQUFFLEtBQUs7U0FDaEIsQ0FBQyxDQUFDO0tBQ0o7SUFDRCxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUU7UUFDakIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsNEJBQTRCLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDckQ7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFDRCxlQUFlLGdCQUFnQixDQUFDIn0=