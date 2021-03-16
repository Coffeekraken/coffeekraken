"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const folderPath_1 = __importDefault(require("./folderPath"));
const ensureDirSync_1 = __importDefault(require("./ensureDirSync"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const replacePathTokens_1 = __importDefault(require("../path/replacePathTokens"));
/**
 * @name        writeFile
 * @namespace           sugar.node.fs
 * @type          Function
 * @async
 * @stable
 *
 * CWrite a file. If don't exist, will be created as well as the directory structure if needed... ( (async)
 * Support the ```replacePathTokens``` tokens
 *
 * @param       {String}              path           The file path to write
 * @param       {String}              data          The data to write in the file
 * @param       {Object}              [options={}]  options are what you'd pass to [fs.writeFile()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
 * @return      {Promise}                           A promise that will be resolved when the writeFile is completed
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import writeFile from '@coffeekraken/node/fs/writeFile';
 * writeFile('my/cool/file.txt', 'Hello World').then(() => {
 *    // do something on complete...
 * });
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function writeFile(path, data, options = {}) {
    path = replacePathTokens_1.default(path);
    const folderPath = folderPath_1.default(path);
    ensureDirSync_1.default(folderPath);
    return fs_extra_1.default.outputFile(path, data, options);
}
exports.default = writeFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVGaWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL25vZGUvZnMvd3JpdGVGaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDhEQUF3QztBQUN4QyxvRUFBOEM7QUFDOUMsd0RBQTRCO0FBQzVCLGtGQUE0RDtBQUU1RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILFNBQVMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxHQUFHLEVBQUU7SUFDekMsSUFBSSxHQUFHLDJCQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLE1BQU0sVUFBVSxHQUFHLG9CQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsdUJBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM1QixPQUFPLGtCQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDOUMsQ0FBQztBQUNELGtCQUFlLFNBQVMsQ0FBQyJ9