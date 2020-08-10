"use strict";

const __downloadsFolder = require('downloads-folder');

const __path = require('path');

const __download = require('download-file'); // TODO tests

/**
 * @name              downloadFile
 * @namespace           node.fs
 * @type              Function
 *
 * Download a file and save it on the file system
 *
 * @param             {String}          downloadUrl             The absolute url to the file that you want to download
 * @param             {String}          [destinationPath=__downloadsFolder()]         The path where you want to save the file. Can be a simple directory path or an absolute file path with the file name and the extension
 * @param             {Function}        [callback=null]           A callback function to call on success or on error. In case of success it will take as parameter the final file path on the file system, otherwise it will be the error passed
 * @return            {Promise}                                 A promise that will be resolved with the final absolute file path, or rejected with the error passed
 *
 * @example       js
 * const downloadFile = require('@coffeekraken/node/fs/downloadFile');
 * downloadFile('https://myCoolFileUrl.ch/coco.json').then((dest) => {
 *    console.log('file downloeaded and saved here', dest);
 * }).catch(err) => {});
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */


module.exports = function (downloadUrl, destinationPath, callback) {
  if (destinationPath === void 0) {
    destinationPath = __downloadsFolder();
  }

  if (callback === void 0) {
    callback = null;
  }

  return new Promise((resolve, reject) => {
    let fileStreamDest;

    let parsedDestinationPath = __path.parse(destinationPath);

    let parsedDownloadUrl = __path.parse(downloadUrl);

    if (parsedDestinationPath.ext) {
      fileStreamDest = destination;
    } else if (destinationPath.slice(-1) === '/' && parsedDownloadUrl.base) {
      fileStreamDest = destinationPath + parsedDownloadUrl.base;
    } else if (parsedDownloadUrl.base) {
      fileStreamDest = `${destinationPath}/${parsedDownloadUrl.base}`;
    } // download the file


    __download(downloadUrl, {
      directory: __path.parse(fileStreamDest).dir,
      filename: __path.parse(fileStreamDest).base
    }, function (err) {
      if (err) {
        reject(err);
        if (callback) return callback(err);
        return;
      }

      resolve(fileStreamDest);
      if (callback) return callback(fileStreamDest);
    });
  });
};