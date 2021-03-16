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
 * @status              beta
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
    return new Promise(({ resolve, reject }) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bmxvYWRGb2xkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbm9kZS9naXRodWIvX193aXBfXy9kb3dubG9hZEZvbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUVkLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUM3QyxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUN2RCxNQUFNLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3RELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMvQixNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFbkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsY0FBYyxDQUN0QyxJQUFJLEVBQ0osSUFBSSxFQUNKLGVBQWUsR0FBRyxpQkFBaUIsRUFBRTtJQUVyQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtRQUN6QyxNQUFNLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDNUQsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7WUFDckMsZUFBZSxHQUFHLGVBQWUsR0FBRyxHQUFHLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztTQUMzRDtRQUVELDZCQUE2QjtRQUM3QixRQUFRLENBQUMsZUFBZSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDbEMsSUFBSSxLQUFLO2dCQUFFLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUV2QyxrQ0FBa0M7WUFDbEMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7aUJBQ3JCLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUNqQixNQUFNLHFCQUFxQixHQUFHLEVBQUUsQ0FBQztnQkFDakMsbUNBQW1DO2dCQUNuQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7b0JBQzNCLCtCQUErQjtvQkFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7d0JBQ25ELHFCQUFxQixDQUFDLElBQUksQ0FDeEIsY0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUNwRCxDQUFDO3dCQUNGLE9BQU87cUJBQ1I7b0JBQ0Qsb0JBQW9CO29CQUNwQixxQkFBcUIsQ0FBQyxJQUFJLENBQ3hCLGNBQWMsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQyxDQUN0RCxDQUFDO2dCQUNKLENBQUMsQ0FBQyxDQUFDO2dCQUNILDJDQUEyQztnQkFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQztxQkFDL0IsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7b0JBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDaEMsQ0FBQyxDQUFDO3FCQUNELEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuQixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==