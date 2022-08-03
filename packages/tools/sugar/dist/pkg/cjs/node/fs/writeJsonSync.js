"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const folderPath_1 = __importDefault(require("./folderPath"));
const ensureDirSync_1 = __importDefault(require("./ensureDirSync"));
const fs_1 = __importDefault(require("fs"));
const stringify_1 = __importDefault(require("../../shared/json/stringify"));
/**
 * @name        writeJsonSync
 * @namespace            node.fs
 * @type          Function
 * @platform        node
 * @status          stable
 *
 * Write a JSON file. If don't exist, will be created as well as the directory structure if needed... (sync)
 *
 * @param       {String}              path           The file path to write
 * @param       {String}              object          The object to write in the JSON file
 * @param       {Object}              [options={}]  options are what you'd pass to [fs.writeJsonSync()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
 *
 * @example       js
 * import writeJsonSync from '@coffeekraken/node/fs/writeJsonSync';
 * try {
 *    writeJsonSync('my/cool/file.json', { hello: 'world' });
 * } catch(e) {}
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function writeJsonSync(path, data, options = {}) {
    const folderPath = (0, folderPath_1.default)(path);
    (0, ensureDirSync_1.default)(folderPath);
    const jsonStr = (0, stringify_1.default)(data, null, 4);
    fs_1.default.writeFileSync(path, jsonStr);
}
exports.default = writeJsonSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDhEQUF3QztBQUN4QyxvRUFBOEM7QUFDOUMsNENBQXNCO0FBQ3RCLDRFQUFzRDtBQUV0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsU0FBUyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEdBQUcsRUFBRTtJQUMzQyxNQUFNLFVBQVUsR0FBRyxJQUFBLG9CQUFZLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsSUFBQSx1QkFBZSxFQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzVCLE1BQU0sT0FBTyxHQUFHLElBQUEsbUJBQVcsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNDLFlBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3RDLENBQUM7QUFDRCxrQkFBZSxhQUFhLENBQUMifQ==