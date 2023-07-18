// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __fastFolderSize from 'fast-folder-size';
/**
 * @name                            folderSize
 * @namespace            node.fs
 * @type                            Function
 * @platform        node
 * @status          beta
 * @async
 *
 * Calculate the size of the passed folder and return it through a promise in bytes format
 *
 * @param             {String}                folderPath                  The folder path to calculate the size
 * @return            {Promise}                                           A promise that will be resolved once the folder size has been calculated
 *
 * @snippet         __folderSize($1)
 * await __folderSize($1)
 *
 * @example           js
 * import { __folderSize } from '@coffeekraken/sugar/fs';
 * await __folderSize('my/cool/folder');
 *
 *
 * @see             https://www.npmjs.com/package/get-folder-size
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __folderSize(folderPath) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        __fastFolderSize(folderPath, (err, bytes) => {
            resolve(bytes);
        });
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGdCQUFnQixNQUFNLGtCQUFrQixDQUFDO0FBRWhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLFlBQVksQ0FBQyxVQUFrQjtJQUNuRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3pDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUN4QyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9