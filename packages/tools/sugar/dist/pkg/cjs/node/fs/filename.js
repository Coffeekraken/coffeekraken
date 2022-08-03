"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const extension_1 = __importDefault(require("./extension"));
/**
 * @name                       filename
 * @namespace            node.fs
 * @type                        Function
 * @platform        node
 * @status          beta
 *
 * Return the filename from the passed path with or without the extension
 *
 * @param           {String}              path              The path to take the filename from
 * @param           {Boolean}             [withExtension=true]        Tell if we want the filename with or without the extension
 * @return          {String}                                  The requested filename
 *
 * @example       js
 * import filename from '@coffeekraken/sugar/node/fs/filename';
 * filename('hello/world.js'); // => world.js
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function filename(path, withExtension = true) {
    let filename = path.split('/').pop();
    if (!withExtension) {
        filename = filename.replace(`.${(0, extension_1.default)(filename)}`, '');
    }
    return filename;
}
exports.default = filename;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDREQUFzQztBQUV0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUNILFNBQVMsUUFBUSxDQUFDLElBQUksRUFBRSxhQUFhLEdBQUcsSUFBSTtJQUN4QyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3JDLElBQUksQ0FBQyxhQUFhLEVBQUU7UUFDaEIsUUFBUSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFBLG1CQUFXLEVBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUNoRTtJQUNELE9BQU8sUUFBUSxDQUFDO0FBQ3BCLENBQUM7QUFDRCxrQkFBZSxRQUFRLENBQUMifQ==