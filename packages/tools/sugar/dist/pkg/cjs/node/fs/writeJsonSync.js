"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const fs_1 = __importDefault(require("fs"));
const stringify_js_1 = __importDefault(require("../../shared/json/stringify.js"));
const ensureDirSync_js_1 = __importDefault(require("./ensureDirSync.js"));
const folderPath_js_1 = __importDefault(require("./folderPath.js"));
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
 * @snippet         __writeJsonSync($1, $2)
 *
 * @example       js
 * import { __writeJsonSync } from '@coffeekraken/sugar/fs';
 * __writeJsonSync('my/cool/file.json', { hello: 'world' });
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __writeJsonSync(path, data, options = {}) {
    const folderPath = (0, folderPath_js_1.default)(path);
    (0, ensureDirSync_js_1.default)(folderPath);
    const jsonStr = (0, stringify_js_1.default)(data, null, 4);
    fs_1.default.writeFileSync(path, jsonStr);
}
exports.default = __writeJsonSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLDRDQUFzQjtBQUN0QixrRkFBeUQ7QUFDekQsMEVBQWlEO0FBQ2pELG9FQUEyQztBQUUzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsU0FBd0IsZUFBZSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxHQUFHLEVBQUU7SUFDNUQsTUFBTSxVQUFVLEdBQUcsSUFBQSx1QkFBWSxFQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLElBQUEsMEJBQWUsRUFBQyxVQUFVLENBQUMsQ0FBQztJQUM1QixNQUFNLE9BQU8sR0FBRyxJQUFBLHNCQUFXLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzQyxZQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN0QyxDQUFDO0FBTEQsa0NBS0MifQ==