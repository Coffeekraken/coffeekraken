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
 * @namespace           sugar.node.fs
 * @type                            Function
 * @async
 * @stable
 *
 * Calculate the size of the passed folder and return it through a promise, either in raw format, either in human readdable one...
 *
 * @param             {String}                folderPath                  The folder path to calculate the size
 * @param             {Boolean}               [rawFormat=false]           If true, will return the folder size in raw format
 * @return            {Promise}                                           A promise that will be resolved once the folder size has been calculated
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import folderSize from '@coffeekraken/sugar/node/fs/folderSize';
 * folderSize('my/cool/folder').then((size) => {
 *      // do something...
 * });
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function folderSize(folderPath, rawFormat = false) {
    return new Promise(({ resolve, reject }) => {
        get_folder_size_1.default(folderPath, (error, size) => {
            if (error)
                throw error;
            resolve(rawFormat ? size : filesize_1.default(size));
        });
    });
}
exports.default = folderSize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9sZGVyU2l6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZvbGRlclNpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsc0VBQXdDO0FBQ3hDLHdEQUFrQztBQUVsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILFNBQVMsVUFBVSxDQUFDLFVBQVUsRUFBRSxTQUFTLEdBQUcsS0FBSztJQUMvQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtRQUN6Qyx5QkFBUyxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUNwQyxJQUFJLEtBQUs7Z0JBQUUsTUFBTSxLQUFLLENBQUM7WUFDdkIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxrQkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFDRCxrQkFBZSxVQUFVLENBQUMifQ==