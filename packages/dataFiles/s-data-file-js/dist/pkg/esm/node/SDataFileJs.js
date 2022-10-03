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
import { __uniqid } from '@coffeekraken/sugar/string';
import __fs from 'fs';
/**
 * @name          SDataFileJs
 * @namespace     node
 * @type          Class
 * @status              beta
 *
 * This class represent the js/json data file loader
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SDataHandlerJs {
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
        return new __SPromise(({ resolve }) => __awaiter(this, void 0, void 0, function* () {
            let settings = {};
            if (filePath.match(/\.json$/)) {
                settings = { assert: { type: 'json' } };
            }
            let finalFilePath = filePath;
            if (filePath.match(/\.json$/)) {
                finalFilePath = filePath.replace('.json', `.${__uniqid()}.json`);
            }
            else {
                finalFilePath = filePath.replace('.js', `.${__uniqid()}.js`);
            }
            // make a copy of the file to avoid import caching
            __fs.copyFileSync(filePath, finalFilePath);
            // import the newly created file
            let data = (yield import(finalFilePath, settings)).default;
            if (typeof data === 'function')
                data = yield data();
            // delete the file
            __fs.unlinkSync(finalFilePath);
            resolve(data);
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
SDataHandlerJs.extensions = ['js', 'json'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDdEQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBRXRCOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sT0FBTyxjQUFjO0lBYy9COzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUTtRQUNoQixPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3hDLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUNsQixJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQzNCLFFBQVEsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDO2FBQzNDO1lBRUQsSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDO1lBQzdCLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDM0IsYUFBYSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQzVCLE9BQU8sRUFDUCxJQUFJLFFBQVEsRUFBRSxPQUFPLENBQ3hCLENBQUM7YUFDTDtpQkFBTTtnQkFDSCxhQUFhLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDaEU7WUFFRCxrREFBa0Q7WUFDbEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFFM0MsZ0NBQWdDO1lBQ2hDLElBQUksSUFBSSxHQUFHLENBQUMsTUFBTSxNQUFNLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQzNELElBQUksT0FBTyxJQUFJLEtBQUssVUFBVTtnQkFBRSxJQUFJLEdBQUcsTUFBTSxJQUFJLEVBQUUsQ0FBQztZQUVwRCxrQkFBa0I7WUFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUUvQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUM7O0FBdkREOzs7Ozs7Ozs7O0dBVUc7QUFDSSx5QkFBVSxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDIn0=