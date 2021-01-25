"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const extension_1 = __importDefault(require("./extension"));
/**
 * @name                       filename
 * @namespace           sugar.node.fs
 * @type                        Function
 * @stable
 *
 * Return the filename from the passed path with or without the extension
 *
 * @param           {String}              path              The path to take the filename from
 * @param           {Boolean}             [withExtension=true]        Tell if we want the filename with or without the extension
 * @return          {String}                                  The requested filename
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import filename from '@coffeekraken/sugar/node/fs/filename';
 * filename('hello/world.js'); // => world.js
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function filename(path, withExtension = true) {
    let filename = path.split('/').pop();
    if (!withExtension) {
        filename = filename.replace(extension_1.default(filename), '');
    }
    return filename;
}
module.exports = filename;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZW5hbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlbmFtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7OztBQUVkLDREQUFzQztBQUV0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQVMsUUFBUSxDQUFDLElBQUksRUFBRSxhQUFhLEdBQUcsSUFBSTtJQUMxQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3JDLElBQUksQ0FBQyxhQUFhLEVBQUU7UUFDbEIsUUFBUSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsbUJBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUN4RDtJQUNELE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUM7QUFDRCxpQkFBUyxRQUFRLENBQUMifQ==