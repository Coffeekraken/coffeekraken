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
import __SPromise from '@coffeekraken/s-promise';
import __SDataHandlerJs from '@coffeekraken/s-data-handler-js';
import __extension from '@coffeekraken/sugar/node/fs/extension';
import __checkPathWithMultipleExtensions from '@coffeekraken/sugar/node/fs/checkPathWithMultipleExtensions';
/**
 * @name          SDataHandlerGeneric
 * @namespace     node
 * @type          Function
 * @status              beta
 *
 * This function simply take the .data.js file path and return
 * the resulting object
 *
 * @param       {String}      filePath      The file path to take care
 * @return      {SPromise}                  An SPromise instance that will be resolved with the resulting object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SDataHandlerGeneric {
    static handle(filePath) {
        return new __SPromise(({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
            const extension = __extension(filePath), filePathWithoutExtension = filePath.replace(`.${extension}`, '');
            const dataFilePath = __checkPathWithMultipleExtensions(`${filePathWithoutExtension}.data.${extension}`, SDataHandlerGeneric.extensions);
            switch (__extension(dataFilePath)) {
                case 'js':
                case 'json':
                    const res = yield __SDataHandlerJs.handle(dataFilePath);
                    return resolve(res);
                    break;
            }
            resolve({});
        }));
    }
}
SDataHandlerGeneric.extensions = ['js', 'json'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLGdCQUFnQixNQUFNLGlDQUFpQyxDQUFDO0FBQy9ELE9BQU8sV0FBVyxNQUFNLHVDQUF1QyxDQUFDO0FBQ2hFLE9BQU8saUNBQWlDLE1BQU0sNkRBQTZELENBQUM7QUFFNUc7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sbUJBQW1CO0lBRXBDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUTtRQUNsQixPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtZQUNoRCxNQUFNLFNBQVMsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQ25DLHdCQUF3QixHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQ3ZDLElBQUksU0FBUyxFQUFFLEVBQ2YsRUFBRSxDQUNMLENBQUM7WUFFTixNQUFNLFlBQVksR0FBRyxpQ0FBaUMsQ0FDbEQsR0FBRyx3QkFBd0IsU0FBUyxTQUFTLEVBQUUsRUFDL0MsbUJBQW1CLENBQUMsVUFBVSxDQUNqQyxDQUFDO1lBRUYsUUFBUSxXQUFXLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQy9CLEtBQUssSUFBSSxDQUFDO2dCQUNWLEtBQUssTUFBTTtvQkFDUCxNQUFNLEdBQUcsR0FBRyxNQUFNLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDeEQsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3BCLE1BQU07YUFDYjtZQUVELE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7QUF4Qk0sOEJBQVUsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyJ9