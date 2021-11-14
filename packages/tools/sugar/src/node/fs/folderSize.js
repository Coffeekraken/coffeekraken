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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function folderSize(folderPath, format = {}) {
    return new Promise((resolve, reject) => {
        __getSize(folderPath, (error, size) => {
            if (error)
                throw error;
            resolve(format === false ? size : __filesize(size, format));
        });
    });
}
export default folderSize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9sZGVyU2l6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZvbGRlclNpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sU0FBUyxNQUFNLGlCQUFpQixDQUFDO0FBQ3hDLE9BQU8sVUFBVSxNQUFNLFVBQVUsQ0FBQztBQUVsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUFTLFVBQVUsQ0FBQyxVQUFrQixFQUFFLE1BQU0sR0FBRyxFQUFFO0lBQy9DLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDbkMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUNsQyxJQUFJLEtBQUs7Z0JBQUUsTUFBTSxLQUFLLENBQUM7WUFDdkIsT0FBTyxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0QsZUFBZSxVQUFVLENBQUMifQ==