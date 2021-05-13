// @ts-nocheck
import __getSize from 'get-folder-size';
import __filesize from 'filesize';
import __replacePathTokens from '../path/replacePathTokens';
/**
 * @name                            folderSize
 * @namespace            node.fs
 * @type                            Function
 * @async
 * @stable
 *
 * Calculate the size of the passed folder and return it through a promise, either in raw format, either in human readdable one...
 * Support the ```replacePathTokens``` tokens
 *
 * @param             {String}                folderPath                  The folder path to calculate the size
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
    folderPath = __replacePathTokens(folderPath);
    return new Promise(({ resolve, reject }) => {
        __getSize(folderPath, (error, size) => {
            if (error)
                throw error;
            resolve(rawFormat ? size : __filesize(size));
        });
    });
}
export default folderSize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9sZGVyU2l6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZvbGRlclNpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sU0FBUyxNQUFNLGlCQUFpQixDQUFDO0FBQ3hDLE9BQU8sVUFBVSxNQUFNLFVBQVUsQ0FBQztBQUNsQyxPQUFPLG1CQUFtQixNQUFNLDJCQUEyQixDQUFDO0FBRTVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILFNBQVMsVUFBVSxDQUFDLFVBQVUsRUFBRSxTQUFTLEdBQUcsS0FBSztJQUMvQyxVQUFVLEdBQUcsbUJBQW1CLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFN0MsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFDekMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUNwQyxJQUFJLEtBQUs7Z0JBQUUsTUFBTSxLQUFLLENBQUM7WUFDdkIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUNELGVBQWUsVUFBVSxDQUFDIn0=