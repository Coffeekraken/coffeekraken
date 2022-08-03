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
 * @example       js
 * import writeJson from '@coffeekraken/node/fs/writeJson';
 * writeJson('my/cool/file.json', { hello: 'world' }).then(() => {
 *    // do something on complete...
 * });
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function writeJson(path, data, options = {}) {
    const folderPath = (0, folderPath_1.default)(path);
    (0, ensureDirSync_1.default)(folderPath);
    const jsonStr = (0, stringify_1.default)(data, null, 4);
    return fs_1.default.writeFile(path, jsonStr);
}
exports.default = writeJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDhEQUF3QztBQUN4QyxvRUFBOEM7QUFDOUMsNENBQXNCO0FBQ3RCLDRFQUFzRDtBQUV0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUFTLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sR0FBRyxFQUFFO0lBQ3ZDLE1BQU0sVUFBVSxHQUFHLElBQUEsb0JBQVksRUFBQyxJQUFJLENBQUMsQ0FBQztJQUN0QyxJQUFBLHVCQUFlLEVBQUMsVUFBVSxDQUFDLENBQUM7SUFDNUIsTUFBTSxPQUFPLEdBQUcsSUFBQSxtQkFBVyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0MsT0FBTyxZQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN6QyxDQUFDO0FBQ0Qsa0JBQWUsU0FBUyxDQUFDIn0=