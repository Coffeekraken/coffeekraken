// @ts-nocheck
import __folderPath from './folderPath';
import __ensureDirSync from './ensureDirSync';
import __fs from 'fs';
import __stringify from '../../shared/json/stringify';
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
    const folderPath = __folderPath(path);
    __ensureDirSync(folderPath);
    const jsonStr = __stringify(data, null, 4);
    __fs.writeFileSync(path, jsonStr);
}
export default writeJsonSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVKc29uU3luYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndyaXRlSnNvblN5bmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sWUFBWSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLGVBQWUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5QyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxXQUFXLE1BQU0sNkJBQTZCLENBQUM7QUFFdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILFNBQVMsYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxHQUFHLEVBQUU7SUFDM0MsTUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM1QixNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN0QyxDQUFDO0FBQ0QsZUFBZSxhQUFhLENBQUMifQ==