"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const ensureDirSync_1 = __importDefault(require("./ensureDirSync"));
const folderPath_1 = __importDefault(require("./folderPath"));
/**
 * @name        writeFileSync
 * @namespace            node.fs
 * @type          Function
 * @platform        node
 * @status          stable
 *
 * Write a file. If don't exist, will be created as well as the directory structure if needed... (sync)
 *
 * @param       {String}              path           The file path to write
 * @param       {String}              data          The data to write in the file
 * @param       {Object}              [options={}]  options are what you'd pass to [fs.writeFileSync()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
 *
 * @example       js
 * import writeFileSync from '@coffeekraken/node/fs/writeFileSync';
 * try {
 *    writeFileSync('my/cool/file.txt', 'Hello World');
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function writeFileSync(path, data, options = {}) {
    const folderPath = (0, folderPath_1.default)(path);
    (0, ensureDirSync_1.default)(folderPath);
    return fs_extra_1.default.outputFileSync(path, data, options);
}
exports.default = writeFileSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdEQUE0QjtBQUM1QixvRUFBOEM7QUFDOUMsOERBQXdDO0FBRXhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBUyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEdBQUcsRUFBRTtJQUMzQyxNQUFNLFVBQVUsR0FBRyxJQUFBLG9CQUFZLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsSUFBQSx1QkFBZSxFQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzVCLE9BQU8sa0JBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNwRCxDQUFDO0FBQ0Qsa0JBQWUsYUFBYSxDQUFDIn0=