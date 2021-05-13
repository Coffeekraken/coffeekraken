// @ts-nocheck
import __folderPath from './folderPath';
import __ensureDirSync from './ensureDirSync';
import __fs from 'fs-extra';
import __replacePathTokens from '../path/replacePathTokens';
/**
 * @name        writeFileSync
 * @namespace            node.fs
 * @type          Function
 * @stable
 *
 * Write a file. If don't exist, will be created as well as the directory structure if needed... (sync)
 * Support the ```replacePathTokens``` tokens
 *
 * @param       {String}              path           The file path to write
 * @param       {String}              data          The data to write in the file
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
    path = __replacePathTokens(path);
    const folderPath = __folderPath(path);
    __ensureDirSync(folderPath);
    return __fs.outputFileSync(path, data, options);
}
export default writeFileSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVGaWxlU3luYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndyaXRlRmlsZVN5bmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sWUFBWSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLGVBQWUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLElBQUksTUFBTSxVQUFVLENBQUM7QUFDNUIsT0FBTyxtQkFBbUIsTUFBTSwyQkFBMkIsQ0FBQztBQUU1RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUFTLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sR0FBRyxFQUFFO0lBQzdDLElBQUksR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxNQUFNLFVBQVUsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzVCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2xELENBQUM7QUFDRCxlQUFlLGFBQWEsQ0FBQyJ9