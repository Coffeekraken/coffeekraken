"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ensureDirSync_1 = __importDefault(require("./ensureDirSync"));
const folderPath_1 = __importDefault(require("./folderPath"));
const fs_extra_1 = __importDefault(require("fs-extra"));
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
 * @snippet         __writeFileSync($1, $2)
 *
 * @example       js
 * import { __writeFileSync } from '@coffeekraken/sugar/fs';
 * __writeFileSync('my/cool/file.txt', 'Hello World');
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __writeFileSync(path, data, options = {}) {
    const folderPath = (0, folderPath_1.default)(path);
    (0, ensureDirSync_1.default)(folderPath);
    return fs_extra_1.default.outputFileSync(path, data, options);
}
exports.default = __writeFileSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLG9FQUE4QztBQUM5Qyw4REFBd0M7QUFFeEMsd0RBQTRCO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBd0IsZUFBZSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxHQUFHLEVBQUU7SUFDNUQsTUFBTSxVQUFVLEdBQUcsSUFBQSxvQkFBWSxFQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLElBQUEsdUJBQWUsRUFBQyxVQUFVLENBQUMsQ0FBQztJQUM1QixPQUFPLGtCQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDcEQsQ0FBQztBQUpELGtDQUlDIn0=