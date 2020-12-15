"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const filesize_1 = __importDefault(require("filesize"));
/**
 * @name                                    formatFileSize
 * @namespace           sugar.node.fs
 * @type                                    Function
 * @stable
 *
 * Transform into human readable string a file size from a number (float or integer) or string.
 * This function use the wonderfull "filesize" npm package under the houd.
 *
 * @param               {Number|String}             size              The size to transform
 * @param               {Object}                    [settings={}]     The "filesize" settings to customize the output
 * @return              {String}                                      The human readable version of the passed size
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import formatFilesize from '@coffeekraken/sugar/node/fs/formatFileSize';
 * formatFileSize(163931); // => 326.86 KB
 *
 * @see             https://www.npmjs.com/package/filesize
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function formatFileSize(size, settings = {}) {
    return filesize_1.default(size, settings);
}
module.exports = formatFileSize;
//# sourceMappingURL=formatFileSize.js.map