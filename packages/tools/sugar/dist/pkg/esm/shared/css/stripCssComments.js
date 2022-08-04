// @ts-nocheck
import __deepMerge from '../object/deepMerge';
import __stripCssComments from 'strip-css-comments';
/**
 * @name          stripCssComments
 * @namespace            js.css
 * @type          Function
 * @platform          js
 * @platform          node
 * @status              beta
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function stripCssComments(css, settings = {}) {
    settings = __deepMerge({
        block: true,
        line: true,
    }, settings);
    if (settings.block) {
        // css = css.replace(/\/\*{2}([\s\S]+?)\*\//g, '');
        css = __stripCssComments(css, {
            preserve: false,
        });
    }
    if (settings.line) {
        css = css.replace(/^[\s]{0,99999999}\/\/.*$/gm, '');
    }
    return css;
}
export default stripCssComments;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLGtCQUFrQixNQUFNLG9CQUFvQixDQUFDO0FBRXBEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0NHO0FBQ0gsU0FBUyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDeEMsUUFBUSxHQUFHLFdBQVcsQ0FDbEI7UUFDSSxLQUFLLEVBQUUsSUFBSTtRQUNYLElBQUksRUFBRSxJQUFJO0tBQ2IsRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUNGLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRTtRQUNoQixtREFBbUQ7UUFDbkQsR0FBRyxHQUFHLGtCQUFrQixDQUFDLEdBQUcsRUFBRTtZQUMxQixRQUFRLEVBQUUsS0FBSztTQUNsQixDQUFDLENBQUM7S0FDTjtJQUNELElBQUksUUFBUSxDQUFDLElBQUksRUFBRTtRQUNmLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLDRCQUE0QixFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ3ZEO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBQ0QsZUFBZSxnQkFBZ0IsQ0FBQyJ9