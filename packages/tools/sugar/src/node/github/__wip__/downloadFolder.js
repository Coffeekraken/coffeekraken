"use strict";
// @ts-nocheck
const __listFolder = require('./listFolder');
const __downloadFile = require('../file/downloadFile');
const __downloadsFolder = require('downloads-folder');
const __path = require('path');
const __mkdirp = require('mkdirp');
/**
 * @name            downloadFolder
 * @namespace           sugar.node.github
 * @type            Function
 * @async
 * @beta
 *
 * Provide the ability to download all the files in a particular folder of a specific repository
 *
 * @param           {String}          repo            The repository name (path) in which live the folder that you want to download
 * @param           {String}          path            The folder path that you want to download
 * @param           {String}          [destinationPath=__downloadsFolder()]       The folder in which you want to save the downloaded one
 * @return          {Promise}                         A promise that will be resolved with the saved absolute files pathes, or rejected with the error passed
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * const downloadFolder = require('@coffeekraken/sugar/node/github/downloadFolder');
 * downloadFolder('Coffeekraken/coffeekraken', 'style/button-style').then((response) => {
 *    console.log('response', response);
 * }).catch((error) => { console.log(error); });
 *
 * @see           https://www.npmjs.com/package/downloads-folder
 * @see           https://www.npmjs.com/package/mkdirp
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function downloadFolder(repo, path, destinationPath = __downloadsFolder()) {
    return new Promise((resolve, reject) => {
        const parsedDestinationPath = __path.parse(destinationPath);
        const parsedPath = __path.parse(path);
        if (destinationPath.slice(-1) !== '/') {
            destinationPath = destinationPath + '/' + parsedPath.base;
        }
        // make sure the folder exist
        __mkdirp(destinationPath, (error) => {
            if (error)
                return console.error(error);
            // first we list the wanted folder
            __listFolder(repo, path)
                .then((response) => {
                const downloadFilesPromises = [];
                // loop on each files in the folder
                response.forEach((fileObj) => {
                    // check if exist a downloadUrl
                    if (!fileObj.download_url && fileObj.type === 'dir') {
                        downloadFilesPromises.push(downloadFolder(repo, fileObj.path, destinationPath));
                        return;
                    }
                    // download the file
                    downloadFilesPromises.push(__downloadFile(fileObj.download_url, destinationPath));
                });
                // waiting for all downloads to be finished
                Promise.all(downloadFilesPromises)
                    .then((files) => {
                    resolve(files.flat(Infinity));
                })
                    .catch(reject);
            })
                .catch(reject);
        });
    });
};
//# sourceMappingURL=downloadFolder.js.map