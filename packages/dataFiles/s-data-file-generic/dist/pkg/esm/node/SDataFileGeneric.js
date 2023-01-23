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
     * @return      {Promise}                  An Promise instance that will be resolved with the resulting object
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static load(filePath) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGFBQWEsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLGNBQWMsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLEVBQ0gsaUNBQWlDLEVBQ2pDLFdBQVcsRUFDZCxNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUV0Qjs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLGdCQUFnQjtJQWNqQzs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVE7UUFDaEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1lBQ2pDLE1BQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFDbkMsd0JBQXdCLEdBQUcsUUFBUTtpQkFDOUIsT0FBTyxDQUFDLElBQUksU0FBUyxFQUFFLEVBQUUsRUFBRSxDQUFDO2lCQUM1QixPQUFPLENBQUMsOEJBQThCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFckQsSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDO1lBRTVCLElBQUksQ0FBQyxDQUFBLFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQSxFQUFFO2dCQUMvQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2FBQ3ZCO1lBRUQsSUFBSSxZQUFZLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRTtnQkFDL0MsNkJBQTZCO2FBQ2hDO2lCQUFNO2dCQUNILFlBQVksR0FBRyxpQ0FBaUMsQ0FDNUMsR0FBRyx3QkFBd0IsRUFBRSxFQUM3QixnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUNwRCxDQUFDO2FBQ0w7WUFFRCw2Q0FBNkM7WUFDN0MsSUFBSSxDQUFDLENBQUEsWUFBWSxhQUFaLFlBQVksdUJBQVosWUFBWSxDQUFFLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBLEVBQUU7Z0JBQy9DLFlBQVksR0FBRyxJQUFJLENBQUM7YUFDdkI7WUFFRCxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNmLE9BQU8sT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3RCO1lBRUQsUUFBUSxXQUFXLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQy9CLEtBQUssS0FBSztvQkFDTixPQUFPLE9BQU8sQ0FBQyxNQUFNLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztvQkFDeEQsTUFBTTtnQkFDVixLQUFLLElBQUksQ0FBQztnQkFDVixLQUFLLE1BQU07b0JBQ1AsT0FBTyxPQUFPLENBQUMsTUFBTSxhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7b0JBQ3ZELE1BQU07YUFDYjtZQUVELE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7QUFyRUQ7Ozs7Ozs7Ozs7R0FVRztBQUNJLDJCQUFVLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDIn0=