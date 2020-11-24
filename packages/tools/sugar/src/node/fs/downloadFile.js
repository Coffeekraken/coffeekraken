"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
    return new Promise((resolve, reject) => {
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
module.exports = downloadFileFn;
