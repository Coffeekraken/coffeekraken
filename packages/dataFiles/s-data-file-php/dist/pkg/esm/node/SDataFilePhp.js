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
import { __dirname } from '@coffeekraken/sugar/fs';
import { __execPhp } from '@coffeekraken/sugar/exec';
import __path from 'path';
import { __packageRootDir } from '@coffeekraken/sugar/path';
/**
 * @name          SDataFilePhp
 * @namespace     node
 * @type          Class
 * @status              beta
 *
 * This class represent the php data file loader
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SDataFilePhp {
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
            const data = yield __execPhp(__path.resolve(__packageRootDir(__dirname()), 'src/php/data.php'), {
                filePath,
            }, {});
            resolve(JSON.parse(data));
        }));
    }
}
/**
 * @name          extensions
 * @type          String[]
 * @default         ['php']
 * @static
 *
 * This static property allow you to define the extensions that the data file loader
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SDataFilePhp.extensions = ['php'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3JELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUU1RDs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sWUFBWTtJQWM3Qjs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVE7UUFDaEIsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUN4QyxNQUFNLElBQUksR0FBRyxNQUFNLFNBQVMsQ0FDeEIsTUFBTSxDQUFDLE9BQU8sQ0FDVixnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUM3QixrQkFBa0IsQ0FDckIsRUFDRDtnQkFDSSxRQUFRO2FBQ1gsRUFDRCxFQUFFLENBQ0wsQ0FBQztZQUNGLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUM7O0FBeENEOzs7Ozs7Ozs7O0dBVUc7QUFDSSx1QkFBVSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMifQ==