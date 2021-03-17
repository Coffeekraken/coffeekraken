"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const downloads_folder_1 = __importDefault(require("downloads-folder"));
const path_1 = __importDefault(require("path"));
const download_file_1 = __importDefault(require("download-file"));
/**
 * @name              downloadFile
 * @namespace           sugar.node.fs
 * @type              Function
 * @stable
 *
 * Download a file and save it on the file system
 *
 * @param             {String}          downloadUrl             The absolute url to the file that you want to download
 * @param             {String}          [destinationPath=__downloadsFolder()]         The path where you want to save the file. Can be a simple directory path or an absolute file path with the file name and the extension
 * @param             {Function}        [callback=null]           A callback function to call on success or on error. In case of success it will take as parameter the final file path on the file system, otherwise it will be the error passed
 * @return            {Promise}                                 A promise that will be resolved with the final absolute file path, or rejected with the error passed
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import downloadFile from '@coffeekraken/node/fs/downloadFile';
 * downloadFile('https://myCoolFileUrl.ch/coco.json').then((dest) => {
 *    console.log('file downloeaded and saved here', dest);
 * }).catch(err) => {});
 *
 * @see           https://www.npmjs.com/package/downloads-folder
 * @see           https://www.npmjs.com/package/download-file
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function downloadFileFn(downloadUrl, destinationPath = downloads_folder_1.default(), callback = null) {
    return new Promise(({ resolve, reject }) => {
        let fileStreamDest;
        let parsedDestinationPath = path_1.default.parse(destinationPath);
        let parsedDownloadUrl = path_1.default.parse(downloadUrl);
        if (parsedDestinationPath.ext) {
            fileStreamDest = destination;
        }
        else if (destinationPath.slice(-1) === '/' && parsedDownloadUrl.base) {
            fileStreamDest = destinationPath + parsedDownloadUrl.base;
        }
        else if (parsedDownloadUrl.base) {
            fileStreamDest = `${destinationPath}/${parsedDownloadUrl.base}`;
        }
        // download the file
        download_file_1.default(downloadUrl, {
            directory: path_1.default.parse(fileStreamDest).dir,
            filename: path_1.default.parse(fileStreamDest).base
        }, function (err) {
            if (err) {
                reject(err);
                if (callback)
                    return callback(err);
                return;
            }
            resolve(fileStreamDest);
            if (callback)
                return callback(fileStreamDest);
        });
    });
}
exports.default = downloadFileFn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bmxvYWRGaWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG93bmxvYWRGaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHdFQUFpRDtBQUNqRCxnREFBMEI7QUFDMUIsa0VBQXVDO0FBRXZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxTQUFTLGNBQWMsQ0FDckIsV0FBVyxFQUNYLGVBQWUsR0FBRywwQkFBaUIsRUFBRSxFQUNyQyxRQUFRLEdBQUcsSUFBSTtJQUVmLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1FBQ3pDLElBQUksY0FBYyxDQUFDO1FBQ25CLElBQUkscUJBQXFCLEdBQUcsY0FBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMxRCxJQUFJLGlCQUFpQixHQUFHLGNBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFbEQsSUFBSSxxQkFBcUIsQ0FBQyxHQUFHLEVBQUU7WUFDN0IsY0FBYyxHQUFHLFdBQVcsQ0FBQztTQUM5QjthQUFNLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLEVBQUU7WUFDdEUsY0FBYyxHQUFHLGVBQWUsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7U0FDM0Q7YUFBTSxJQUFJLGlCQUFpQixDQUFDLElBQUksRUFBRTtZQUNqQyxjQUFjLEdBQUcsR0FBRyxlQUFlLElBQUksaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDakU7UUFFRCxvQkFBb0I7UUFDcEIsdUJBQVUsQ0FDUixXQUFXLEVBQ1g7WUFDRSxTQUFTLEVBQUUsY0FBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFHO1lBQzNDLFFBQVEsRUFBRSxjQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUk7U0FDNUMsRUFDRCxVQUFVLEdBQUc7WUFDWCxJQUFJLEdBQUcsRUFBRTtnQkFDUCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ1osSUFBSSxRQUFRO29CQUFFLE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQyxPQUFPO2FBQ1I7WUFDRCxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDeEIsSUFBSSxRQUFRO2dCQUFFLE9BQU8sUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBQ0Qsa0JBQWUsY0FBYyxDQUFDIn0=