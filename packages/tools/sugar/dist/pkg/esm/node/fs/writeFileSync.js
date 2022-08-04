// @ts-nocheck
import __fs from 'fs-extra';
import __ensureDirSync from './ensureDirSync';
import __folderPath from './folderPath';
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
    const folderPath = __folderPath(path);
    __ensureDirSync(folderPath);
    return __fs.outputFileSync(path, data, options);
}
export default writeFileSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLElBQUksTUFBTSxVQUFVLENBQUM7QUFDNUIsT0FBTyxlQUFlLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxZQUFZLE1BQU0sY0FBYyxDQUFDO0FBRXhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBUyxhQUFhLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEdBQUcsRUFBRTtJQUMzQyxNQUFNLFVBQVUsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzVCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3BELENBQUM7QUFDRCxlQUFlLGFBQWEsQ0FBQyJ9