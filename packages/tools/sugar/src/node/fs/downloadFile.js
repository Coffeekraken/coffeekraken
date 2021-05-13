"use strict";
// @ts-nocheck
// import __downloadsFolder from 'downloads-folder';
// import __path from 'path';
// import __download from 'download-file';
// /**
//  * @name              downloadFile
//  * @namespace            node.fs
//  * @type              Function
//  * @status            alpha
//  *
//  * Download a file and save it on the file system
//  *
//  * @param             {String}          downloadUrl             The absolute url to the file that you want to download
//  * @param             {String}          [destinationPath=__downloadsFolder()]         The path where you want to save the file. Can be a simple directory path or an absolute file path with the file name and the extension
//  * @param             {Function}        [callback=null]           A callback function to call on success or on error. In case of success it will take as parameter the final file path on the file system, otherwise it will be the error passed
//  * @return            {Promise}                                 A promise that will be resolved with the final absolute file path, or rejected with the error passed
//  *
//  * @todo      interface
//  * @todo      doc
//  * @todo      tests
//  *
//  * @example       js
//  * import downloadFile from '@coffeekraken/node/fs/downloadFile';
//  * downloadFile('https://myCoolFileUrl.ch/coco.json').then((dest) => {
//  *    console.log('file downloeaded and saved here', dest);
//  * }).catch(err) => {});
//  *
//  * @see           https://www.npmjs.com/package/downloads-folder
//  * @see           https://www.npmjs.com/package/download-file
//  * @since         2.0.0
//  * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
//  */
// function downloadFileFn(
//   downloadUrl,
//   destinationPath = __downloadsFolder(),
//   callback = null
// ) {
//   return new Promise(({ resolve, reject }) => {
//     let fileStreamDest;
//     let parsedDestinationPath = __path.parse(destinationPath);
//     let parsedDownloadUrl = __path.parse(downloadUrl);
//     if (parsedDestinationPath.ext) {
//       fileStreamDest = destination;
//     } else if (destinationPath.slice(-1) === '/' && parsedDownloadUrl.base) {
//       fileStreamDest = destinationPath + parsedDownloadUrl.base;
//     } else if (parsedDownloadUrl.base) {
//       fileStreamDest = `${destinationPath}/${parsedDownloadUrl.base}`;
//     }
//     // download the file
//     __download(
//       downloadUrl,
//       {
//         directory: __path.parse(fileStreamDest).dir,
//         filename: __path.parse(fileStreamDest).base
//       },
//       function (err) {
//         if (err) {
//           reject(err);
//           if (callback) return callback(err);
//           return;
//         }
//         resolve(fileStreamDest);
//         if (callback) return callback(fileStreamDest);
//       }
//     );
//   });
// }
// export default downloadFileFn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bmxvYWRGaWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG93bmxvYWRGaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBRWQsb0RBQW9EO0FBQ3BELDZCQUE2QjtBQUM3QiwwQ0FBMEM7QUFFMUMsTUFBTTtBQUNOLHFDQUFxQztBQUNyQyxtQ0FBbUM7QUFDbkMsaUNBQWlDO0FBQ2pDLDhCQUE4QjtBQUM5QixLQUFLO0FBQ0wsb0RBQW9EO0FBQ3BELEtBQUs7QUFDTCx5SEFBeUg7QUFDekgsK05BQStOO0FBQy9OLG1QQUFtUDtBQUNuUCx1S0FBdUs7QUFDdkssS0FBSztBQUNMLDBCQUEwQjtBQUMxQixvQkFBb0I7QUFDcEIsc0JBQXNCO0FBQ3RCLEtBQUs7QUFDTCx1QkFBdUI7QUFDdkIsb0VBQW9FO0FBQ3BFLHlFQUF5RTtBQUN6RSw4REFBOEQ7QUFDOUQsMkJBQTJCO0FBQzNCLEtBQUs7QUFDTCxtRUFBbUU7QUFDbkUsZ0VBQWdFO0FBQ2hFLDBCQUEwQjtBQUMxQiwyRkFBMkY7QUFDM0YsTUFBTTtBQUNOLDJCQUEyQjtBQUMzQixpQkFBaUI7QUFDakIsMkNBQTJDO0FBQzNDLG9CQUFvQjtBQUNwQixNQUFNO0FBQ04sa0RBQWtEO0FBQ2xELDBCQUEwQjtBQUMxQixpRUFBaUU7QUFDakUseURBQXlEO0FBRXpELHVDQUF1QztBQUN2QyxzQ0FBc0M7QUFDdEMsZ0ZBQWdGO0FBQ2hGLG1FQUFtRTtBQUNuRSwyQ0FBMkM7QUFDM0MseUVBQXlFO0FBQ3pFLFFBQVE7QUFFUiwyQkFBMkI7QUFDM0Isa0JBQWtCO0FBQ2xCLHFCQUFxQjtBQUNyQixVQUFVO0FBQ1YsdURBQXVEO0FBQ3ZELHNEQUFzRDtBQUN0RCxXQUFXO0FBQ1gseUJBQXlCO0FBQ3pCLHFCQUFxQjtBQUNyQix5QkFBeUI7QUFDekIsZ0RBQWdEO0FBQ2hELG9CQUFvQjtBQUNwQixZQUFZO0FBQ1osbUNBQW1DO0FBQ25DLHlEQUF5RDtBQUN6RCxVQUFVO0FBQ1YsU0FBUztBQUNULFFBQVE7QUFDUixJQUFJO0FBQ0osaUNBQWlDIn0=