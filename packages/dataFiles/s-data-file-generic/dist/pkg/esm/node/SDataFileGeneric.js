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
import __SDataFileJs from '@coffeekraken/s-data-file-js';
import __SDataFilePhp from '@coffeekraken/s-data-file-php';
import __SPromise from '@coffeekraken/s-promise';
import { __checkPathWithMultipleExtensions, __extension } from '@coffeekraken/sugar/fs';
import __fs from 'fs';
/**
 * @name          SDataFileGeneric
 * @namespace     node
 * @type          Class
 * @status              beta
 *
 * This class represent the generic data file loader.
 * It actually regroup all the other data file loader into one single for convinience.
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SDataFileGeneric {
    /**
     * @name          load
     * @type          Function
     * @static
     *
     * This static method allows you to actually load a data file
     *
     * @param       {String}      filePath      The file path to take care
     * @return      {SPromise}                  An SPromise instance that will be resolved with the resulting object
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static load(filePath) {
        return new __SPromise(({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
            const extension = __extension(filePath), filePathWithoutExtension = filePath
                .replace(`.${extension}`, '')
                .replace(/\.(data|spec)\.[a-zA-Z0-9]+$/, '');
            let dataFilePath = filePath;
            if (!(dataFilePath === null || dataFilePath === void 0 ? void 0 : dataFilePath.match(/\.data\.[a-zA-Z0-9]+$/))) {
                dataFilePath = null;
            }
            if (dataFilePath && __fs.existsSync(dataFilePath)) {
                // direct data file reference
            }
            else {
                dataFilePath = __checkPathWithMultipleExtensions(`${filePathWithoutExtension}`, SDataFileGeneric.extensions.map(p => `data.${p}`));
            }
            // make sure the file is a .data.something...
            if (!(dataFilePath === null || dataFilePath === void 0 ? void 0 : dataFilePath.match(/\.data\.[a-zA-Z0-9]+$/))) {
                dataFilePath = null;
            }
            if (!dataFilePath) {
                return resolve({});
            }
            switch (__extension(dataFilePath)) {
                case 'php':
                    return resolve(yield __SDataFilePhp.load(dataFilePath));
                    break;
                case 'js':
                case 'json':
                    return resolve(yield __SDataFileJs.load(dataFilePath));
                    break;
            }
            resolve({});
        }));
    }
}
/**
 * @name          extensions
 * @type          String[]
 * @default         ['js', 'json']
 * @static
 *
 * This static property allow you to define the extensions that the data file loader
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SDataFileGeneric.extensions = ['php', 'js', 'json'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLGNBQWMsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQ0gsaUNBQWlDLEVBQ2pDLFdBQVcsRUFDZCxNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUV0Qjs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLGdCQUFnQjtJQWNqQzs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVE7UUFDaEIsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7WUFDaEQsTUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUNuQyx3QkFBd0IsR0FBRyxRQUFRO2lCQUM5QixPQUFPLENBQUMsSUFBSSxTQUFTLEVBQUUsRUFBRSxFQUFFLENBQUM7aUJBQzVCLE9BQU8sQ0FBQyw4QkFBOEIsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUVyRCxJQUFJLFlBQVksR0FBRyxRQUFRLENBQUM7WUFFNUIsSUFBSSxDQUFDLENBQUEsWUFBWSxhQUFaLFlBQVksdUJBQVosWUFBWSxDQUFFLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBLEVBQUU7Z0JBQy9DLFlBQVksR0FBRyxJQUFJLENBQUM7YUFDdkI7WUFFRCxJQUFJLFlBQVksSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFO2dCQUMvQyw2QkFBNkI7YUFDaEM7aUJBQU07Z0JBQ0gsWUFBWSxHQUFHLGlDQUFpQyxDQUM1QyxHQUFHLHdCQUF3QixFQUFFLEVBQzdCLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQ3BELENBQUM7YUFDTDtZQUVELDZDQUE2QztZQUM3QyxJQUFJLENBQUMsQ0FBQSxZQUFZLGFBQVosWUFBWSx1QkFBWixZQUFZLENBQUUsS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUEsRUFBRTtnQkFDL0MsWUFBWSxHQUFHLElBQUksQ0FBQzthQUN2QjtZQUVELElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ2YsT0FBTyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDdEI7WUFFRCxRQUFRLFdBQVcsQ0FBQyxZQUFZLENBQUMsRUFBRTtnQkFDL0IsS0FBSyxLQUFLO29CQUNOLE9BQU8sT0FBTyxDQUFDLE1BQU0sY0FBYyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO29CQUN4RCxNQUFNO2dCQUNWLEtBQUssSUFBSSxDQUFDO2dCQUNWLEtBQUssTUFBTTtvQkFDUCxPQUFPLE9BQU8sQ0FBQyxNQUFNLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztvQkFDdkQsTUFBTTthQUNiO1lBRUQsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDOztBQXJFRDs7Ozs7Ozs7OztHQVVHO0FBQ0ksMkJBQVUsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMifQ==