// @ts-nocheck
import __filesize from 'filesize';
/**
 * @name                                    formatFileSize
 * @namespace            node.fs
 * @type                                    Function
 * @platform        node
 * @status          stable
 *
 * Transform into human readable string a file size from a number (float or integer) or string.
 * This function use the wonderfull "filesize" npm package under the houd.
 *
 * @param               {Number|String}             size              The size to transform
 * @param               {Object}                    [settings={}]     The "filesize" settings to customize the output. See [filesize](https://www.npmjs.com/package/filesize) settings
 * @return              {String}                                      The human readable version of the passed size
 *
 * @example             js
 * import formatFilesize from '@coffeekraken/sugar/node/fs/formatFileSize';
 * formatFileSize(163931); // => 326.86 KB
 *
 * @see             https://www.npmjs.com/package/filesize
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function formatFileSize(size, settings = {}) {
    return __filesize(size, settings);
}
export default formatFileSize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0RmlsZVNpemUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmb3JtYXRGaWxlU2l6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxVQUFVLE1BQU0sVUFBVSxDQUFDO0FBRWxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxTQUFTLGNBQWMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDdkMsT0FBTyxVQUFVLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3RDLENBQUM7QUFDRCxlQUFlLGNBQWMsQ0FBQyJ9