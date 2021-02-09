"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const folderPath_1 = __importDefault(require("./folderPath"));
const ensureDirSync_1 = __importDefault(require("./ensureDirSync"));
const fs_extra_1 = __importDefault(require("fs-extra"));
/**
 * @name        writeJson
 * @namespace           sugar.node.fs
 * @type          Function
 * @async
 * @stable
 *
 * Write a JSON file. If don't exist, will be created as well as the directory structure if needed... ( (async)
 *
 * @param       {String}              path           The file path to write
 * @param       {String}              object          The object to write in the JSON file
 * @param       {Object}              [options={}]  options are what you'd pass to [fs.writeJson()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
 * @return      {Promise}                           A promise that will be resolved when the writeJson is completed
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import writeJson from '@coffeekraken/node/fs/writeJson';
 * writeJson('my/cool/file.json', { hello: 'world' }).then(() => {
 *    // do something on complete...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function writeJson(path, data, options = {}) {
    const folderPath = folderPath_1.default(path);
    ensureDirSync_1.default(folderPath);
    return fs_extra_1.default.outputJson(path, data, options);
}
exports.default = writeJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVKc29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid3JpdGVKc29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDhEQUF3QztBQUN4QyxvRUFBOEM7QUFDOUMsd0RBQTRCO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxTQUFTLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sR0FBRyxFQUFFO0lBQ3pDLE1BQU0sVUFBVSxHQUFHLG9CQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsdUJBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM1QixPQUFPLGtCQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDOUMsQ0FBQztBQUNELGtCQUFlLFNBQVMsQ0FBQyJ9