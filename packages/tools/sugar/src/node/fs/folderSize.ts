// @ts-nocheck

import __getSize from 'get-folder-size';
import __filesize from 'filesize';

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
function folderSize(folderPath: string, format = {}) {
    return new Promise((resolve, reject) => {
        __getSize(folderPath, (error, size) => {
            if (error) throw error;
            resolve(format === false ? size : __filesize(size, format));
        });
    });
}
export default folderSize;
