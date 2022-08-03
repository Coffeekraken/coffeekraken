"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const filesize_1 = __importDefault(require("filesize"));
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
    return (0, filesize_1.default)(size, settings);
}
exports.default = formatFileSize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdEQUFrQztBQUVsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsU0FBUyxjQUFjLENBQUMsSUFBSSxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ3ZDLE9BQU8sSUFBQSxrQkFBVSxFQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztBQUN0QyxDQUFDO0FBQ0Qsa0JBQWUsY0FBYyxDQUFDIn0=