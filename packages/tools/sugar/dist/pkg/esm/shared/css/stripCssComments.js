// @ts-nocheck
import __stripCssComments from 'strip-css-comments';
import __deepMerge from '../object/deepMerge.js';
/**
 * @name          stripCssComments
 * @namespace            shared.css
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
 * @snippet         __stripCssComments($1)
 *
 * @example       js
 * import { __stripCssComments } from '@coffeekraken/sugar/css';
 * __stripCssComments(`
 * // something cool
 * body { background-color: red; }
 * `);
 * // body { background-color: red }
 *
 * @see         https://www.npmjs.com/package/strip-css-comments
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function stripCssComments(css, settings = {}) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGtCQUFrQixNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sV0FBVyxNQUFNLHdCQUF3QixDQUFDO0FBRWpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQ0c7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUN2RCxRQUFRLEdBQUcsV0FBVyxDQUNsQjtRQUNJLEtBQUssRUFBRSxJQUFJO1FBQ1gsSUFBSSxFQUFFLElBQUk7S0FDYixFQUNELFFBQVEsQ0FDWCxDQUFDO0lBQ0YsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFO1FBQ2hCLG1EQUFtRDtRQUNuRCxHQUFHLEdBQUcsa0JBQWtCLENBQUMsR0FBRyxFQUFFO1lBQzFCLFFBQVEsRUFBRSxLQUFLO1NBQ2xCLENBQUMsQ0FBQztLQUNOO0lBQ0QsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFO1FBQ2YsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsNEJBQTRCLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDdkQ7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUMifQ==