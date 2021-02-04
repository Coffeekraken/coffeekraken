"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const folderPath_1 = __importDefault(require("./folderPath"));
const ensureDirSync_1 = __importDefault(require("./ensureDirSync"));
const fs_extra_1 = __importDefault(require("fs-extra"));
/**
 * @name        writeFileSync
 * @namespace           sugar.node.fs
 * @type          Function
 * @stable
 *
 * Write a file. If don't exist, will be created as well as the directory structure if needed... (sync)
 *
 * @param       {String}              path           The file path to write
 * @param       {String}              data          The data to write in the file
 * @param       {Object}              [options={}]  options are what you'd pass to [fs.writeFileSync()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import writeFileSync from '@coffeekraken/node/fs/writeFileSync';
 * try {
 *    writeFileSync('my/cool/file.txt', 'Hello World');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function writeFileSync(path, data, options = {}) {
    const folderPath = folderPath_1.default(path);
    ensureDirSync_1.default(folderPath);
    return fs_extra_1.default.outputFileSync(path, data, options);
}
module.exports = writeFileSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVGaWxlU3luYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndyaXRlRmlsZVN5bmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7QUFFZCw4REFBd0M7QUFDeEMsb0VBQThDO0FBQzlDLHdEQUE0QjtBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQVMsYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxHQUFHLEVBQUU7SUFDN0MsTUFBTSxVQUFVLEdBQUcsb0JBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0Qyx1QkFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzVCLE9BQU8sa0JBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNsRCxDQUFDO0FBQ0QsaUJBQVMsYUFBYSxDQUFDIn0=