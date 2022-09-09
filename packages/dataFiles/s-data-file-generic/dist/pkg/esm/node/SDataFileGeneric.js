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
import { __checkPathWithMultipleExtensions, __extension, } from '@coffeekraken/sugar/fs';
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
export default class SDataHandlerGeneric {
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
            const extension = __extension(filePath), filePathWithoutExtension = filePath.replace(`.${extension}`, '');
            let dataFilePath = filePath;
            if (!__fs.existsSync(dataFilePath) ||
                !SDataHandlerGeneric.extensions.includes(extension)) {
                dataFilePath = __checkPathWithMultipleExtensions(`${filePathWithoutExtension}.data.${extension}`, SDataHandlerGeneric.extensions);
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
SDataHandlerGeneric.extensions = ['php', 'js', 'json'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLGNBQWMsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQ0gsaUNBQWlDLEVBQ2pDLFdBQVcsR0FDZCxNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUV0Qjs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLG1CQUFtQjtJQWNwQzs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVE7UUFDaEIsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7WUFDaEQsTUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUNuQyx3QkFBd0IsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUN2QyxJQUFJLFNBQVMsRUFBRSxFQUNmLEVBQUUsQ0FDTCxDQUFDO1lBRU4sSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDO1lBQzVCLElBQ0ksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQztnQkFDOUIsQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUNyRDtnQkFDRSxZQUFZLEdBQUcsaUNBQWlDLENBQzVDLEdBQUcsd0JBQXdCLFNBQVMsU0FBUyxFQUFFLEVBQy9DLG1CQUFtQixDQUFDLFVBQVUsQ0FDakMsQ0FBQzthQUNMO1lBRUQsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDZixPQUFPLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN0QjtZQUVELFFBQVEsV0FBVyxDQUFDLFlBQVksQ0FBQyxFQUFFO2dCQUMvQixLQUFLLEtBQUs7b0JBQ04sT0FBTyxPQUFPLENBQUMsTUFBTSxjQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7b0JBQ3hELE1BQU07Z0JBQ1YsS0FBSyxJQUFJLENBQUM7Z0JBQ1YsS0FBSyxNQUFNO29CQUNQLE9BQU8sT0FBTyxDQUFDLE1BQU0sYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO29CQUN2RCxNQUFNO2FBQ2I7WUFFRCxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUM7O0FBN0REOzs7Ozs7Ozs7O0dBVUc7QUFDSSw4QkFBVSxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyJ9