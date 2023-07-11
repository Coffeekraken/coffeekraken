"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ensureDirSync_js_1 = __importDefault(require("./ensureDirSync.js"));
const folderPath_js_1 = __importDefault(require("./folderPath.js"));
const fs_1 = __importDefault(require("fs"));
const stringify_js_1 = __importDefault(require("../../shared/json/stringify.js"));
/**
 * @name        writeJson
 * @namespace            node.fs
 * @type          Function
 * @async
 * @platform        node
 * @status          stable
 *
 * Write a JSON file. If don't exist, will be created as well as the directory structure if needed... ( (async)
 *
 * @param       {String}              path           The file path to write
 * @param       {String}              object          The object to write in the JSON file
 * @param       {Object}              [options={}]  options are what you'd pass to [fs.writeJson()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
 * @return      {Promise}                           A promise that will be resolved when the writeJson is completed
 *
 * @snippet         __writeJson($1, $2)
 * await _writeJson($1, $2)
 *
 * @example       js
 * import { __writeJson } from '@coffeekraken/sugar/fs';
 * __writeJson('my/cool/file.json', { hello: 'world' }).then(() => {
 *    // do something on complete...
 * });
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __writeJson(path, data, options = {}) {
    const folderPath = (0, folderPath_js_1.default)(path);
    (0, ensureDirSync_js_1.default)(folderPath);
    const jsonStr = (0, stringify_js_1.default)(data, null, 4);
    return fs_1.default.writeFile(path, jsonStr);
}
exports.default = __writeJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDBFQUFpRDtBQUNqRCxvRUFBMkM7QUFFM0MsNENBQXNCO0FBQ3RCLGtGQUF5RDtBQUV6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUF3QixXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEdBQUcsRUFBRTtJQUN4RCxNQUFNLFVBQVUsR0FBRyxJQUFBLHVCQUFZLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsSUFBQSwwQkFBZSxFQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzVCLE1BQU0sT0FBTyxHQUFHLElBQUEsc0JBQVcsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNDLE9BQU8sWUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDekMsQ0FBQztBQUxELDhCQUtDIn0=