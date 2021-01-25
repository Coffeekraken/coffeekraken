"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_extra_1 = __importDefault(require("fs-extra"));
/**
 * @name        writeJsonSync
 * @namespace           sugar.node.fs
 * @type          Function
 * @stabée
 *
 * Write a JSON file. If don't exist, will be created as well as the directory structure if needed... (sync)
 *
 * @param       {String}              path           The file path to write
 * @param       {String}              object          The object to write in the JSON file
 * @param       {Object}              [options={}]  options are what you'd pass to [fs.writeJsonSync()](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import writeJsonSync from '@coffeekraken/node/fs/writeJsonSync';
 * try {
 *    writeJsonSync('my/cool/file.json', { hello: 'world' });
 * } catch(e) {}
 *
 * @see             https://github.com/jprichardson/node-fs-extra
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function writeJsonSync(path, data, options = {}) {
    fs_extra_1.default.outputJsonSync(path, data, options);
}
module.exports = writeJsonSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVKc29uU3luYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndyaXRlSnNvblN5bmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7QUFFZCx3REFBNEI7QUFFNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxTQUFTLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sR0FBRyxFQUFFO0lBQzdDLGtCQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDM0MsQ0FBQztBQUNELGlCQUFTLGFBQWEsQ0FBQyJ9