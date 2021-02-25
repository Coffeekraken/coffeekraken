// @ts-nocheck
// @shared
import __SError from '../error/SError';
import __deepMerge from '../object/deepMerge';
import __htmlFromMarkdown from './html/htmlFromMarkdown';
import __htmlFromDocblocks from './html/htmlFromDocblocks';
/**
 * @name            toHtml
 * @namespace       sugar.js.convert
 * @type            Function
 * @status              wip
 *
 * Take a string as input and convert it to HTML.
 *
 * @feature        2.0.0       Supported input types: markdown, docblocks
 * @feature        2.0.0       Try to detect the type automatically. For safer results, specify the "from" setting.
 *
 * @param       {String}          inputString         The input string to convert to HTML
 * @param       {Object}          [settings={}]       An object of settings to configure your conversion process:
 * - from (null) {String}: Specify the type of the input string like "markdown", "dockblocks", and more coming...
 * @return      {String}                              The HTML converted result
 *
 * @todo        interface
 * @todo        doc
 *
 * @example       js
 * import toHtml from '@coffeekraken/sugar/js/convert/toHtml';
 * toHtml(`
 *  # Hello world
 *  How are you?
 * `);
 * // <h1>Hello world</h1>
 * // <p>How are you</p>
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const supportedFromTypes = ['markdown', 'docblocks'];
const convertersByType = {
    markdown: __htmlFromMarkdown,
    docblocks: __htmlFromDocblocks
};
function toHtml(inputString, settings = {}) {
    settings = __deepMerge({
        from: null
    }, settings);
    // check if we don't have the "from" setting
    if (!settings.from) {
        // check if is markdown
        if (inputString.match(/\s?#{1,6}\s?.*/g))
            settings.from = 'markdown';
        else if (inputString.match(/(<!--|\/\*{2})([\s\S]+?)(\*\/|-->)/g))
            settings.from = 'docblocks';
        else {
            throw new __SError(`Sorry but the passed inputString does not match any supported type which are: ${supportedFromTypes.join(',')}`);
        }
    }
    // convert the string from the correct type
    const converterFn = convertersByType[settings.from];
    if (!converterFn) {
        throw new __SError(`It seems that no converter exists for your inputString which is of type "<yellow>${settings.from}</yellow>"...`);
    }
    return converterFn(inputString, settings);
}
export default toHtml;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9IdG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidG9IdG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVYsT0FBTyxRQUFRLE1BQU0saUJBQWlCLENBQUM7QUFDdkMsT0FBTyxXQUFXLE1BQU0scUJBQXFCLENBQUM7QUFDOUMsT0FBTyxrQkFBa0IsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLG1CQUFtQixNQUFNLDBCQUEwQixDQUFDO0FBRTNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4Qkc7QUFDSCxNQUFNLGtCQUFrQixHQUFHLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ3JELE1BQU0sZ0JBQWdCLEdBQUc7SUFDdkIsUUFBUSxFQUFFLGtCQUFrQjtJQUM1QixTQUFTLEVBQUUsbUJBQW1CO0NBQy9CLENBQUM7QUFDRixTQUFTLE1BQU0sQ0FBQyxXQUFXLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDeEMsUUFBUSxHQUFHLFdBQVcsQ0FDcEI7UUFDRSxJQUFJLEVBQUUsSUFBSTtLQUNYLEVBQ0QsUUFBUSxDQUNULENBQUM7SUFFRiw0Q0FBNEM7SUFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7UUFDbEIsdUJBQXVCO1FBQ3ZCLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQztZQUFFLFFBQVEsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO2FBQ2hFLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQztZQUMvRCxRQUFRLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQzthQUN6QjtZQUNILE1BQU0sSUFBSSxRQUFRLENBQ2hCLGlGQUFpRixrQkFBa0IsQ0FBQyxJQUFJLENBQ3RHLEdBQUcsQ0FDSixFQUFFLENBQ0osQ0FBQztTQUNIO0tBQ0Y7SUFFRCwyQ0FBMkM7SUFDM0MsTUFBTSxXQUFXLEdBQUcsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXBELElBQUksQ0FBQyxXQUFXLEVBQUU7UUFDaEIsTUFBTSxJQUFJLFFBQVEsQ0FDaEIsb0ZBQW9GLFFBQVEsQ0FBQyxJQUFJLGVBQWUsQ0FDakgsQ0FBQztLQUNIO0lBRUQsT0FBTyxXQUFXLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFDRCxlQUFlLE1BQU0sQ0FBQyJ9