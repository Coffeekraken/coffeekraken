"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_folder_size_1 = __importDefault(require("get-folder-size"));
const filesize_1 = __importDefault(require("filesize"));
/**
 * @name                            folderSize
 * @namespace            node.fs
 * @type                            Function
 * @async
 * @platform        node
 * @status          beta
 *
 * Calculate the size of the passed folder and return it through a promise, either in raw format, either in human readdable one...
 *
 * @param             {String}                folderPath                  The folder path to calculate the size
 * @param             {Boolean|Any}               [format={}]               False if you want raw size, an object that will be sent to [filesize](https://www.npmjs.com/package/filesize) package to format your data
 * @return            {Promise}                                           A promise that will be resolved once the folder size has been calculated
 *
 * @example           js
 * import folderSize from '@coffeekraken/sugar/node/fs/folderSize';
 * await folderSize('my/cool/folder');
 * await folderSize('my/cool/folder', false); // no formatting
 *
 *
 * @see             https://www.npmjs.com/package/filesize
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function folderSize(folderPath, format = {}) {
    return new Promise((resolve, reject) => {
        (0, get_folder_size_1.default)(folderPath, (error, size) => {
            if (error)
                throw error;
            resolve(format === false ? size : (0, filesize_1.default)(size, format));
        });
    });
}
exports.default = folderSize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHNFQUF3QztBQUN4Qyx3REFBa0M7QUFFbEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsU0FBUyxVQUFVLENBQUMsVUFBa0IsRUFBRSxNQUFNLEdBQUcsRUFBRTtJQUMvQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLElBQUEseUJBQVMsRUFBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDbEMsSUFBSSxLQUFLO2dCQUFFLE1BQU0sS0FBSyxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUEsa0JBQVUsRUFBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNoRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNELGtCQUFlLFVBQVUsQ0FBQyJ9