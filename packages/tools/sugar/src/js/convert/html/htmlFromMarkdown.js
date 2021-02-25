// @ts-nocheck
// @shared
import __deepMerge from '../../object/deepMerge';
import __marked from 'marked';
/**
 * @name            htmlFromMarkdown
 * @namespace       sugar.js.convert
 * @type            Function
 * @status              wip
 *
 * Take a markdown string as input and convert it to HTML.
 *
 * @param       {String}          inputString         The input string to convert to HTML
 * @param       {Object}          [settings={}]       An object of settings to configure your conversion process. All the ```marked``` settings are supported
 * @return      {String}                              The HTML converted result
 *
 * @todo        interface
 * @todo        doc
 *
 * @example       js
 * import htmlFromMarkdown from '@coffeekraken/sugar/js/convert/html/htmlFromMarkdown';
 * htmlFromMarkdown(`
 *  # Hello world
 *  How are you?
 * `);
 * // <h1>Hello world</h1>
 * // <p>How are you</p>
 *
 * @since       2.0.0
 * @see       https://marked.js.org/#/README.md
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function htmlFromMarkdown(inputString, settings = {}) {
    settings = __deepMerge({}, settings);
    __marked.setOptions(settings);
    return __marked(inputString);
}
export default htmlFromMarkdown;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbEZyb21NYXJrZG93bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImh0bWxGcm9tTWFya2Rvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7QUFHVixPQUFPLFdBQVcsTUFBTSx3QkFBd0IsQ0FBQztBQUNqRCxPQUFPLFFBQVEsTUFBTSxRQUFRLENBQUM7QUFFOUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUNILFNBQVMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ2xELFFBQVEsR0FBRyxXQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3JDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUIsT0FBTyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUNELGVBQWUsZ0JBQWdCLENBQUMifQ==