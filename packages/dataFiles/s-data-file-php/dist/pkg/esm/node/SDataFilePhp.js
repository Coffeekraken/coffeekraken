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
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __execPhp from '@coffeekraken/sugar/node/php/execPhp';
import __path from 'path';
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
            const data = yield __execPhp(__path.resolve(__packageRoot(__dirname()), 'src/php/data.php'), {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFNBQVMsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RCxPQUFPLFNBQVMsTUFBTSxzQ0FBc0MsQ0FBQztBQUM3RCxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFFMUI7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLFlBQVk7SUFjN0I7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRO1FBQ2hCLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDeEMsTUFBTSxJQUFJLEdBQUcsTUFBTSxTQUFTLENBQ3hCLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsa0JBQWtCLENBQUMsRUFDOUQ7Z0JBQ0ksUUFBUTthQUNYLEVBQ0QsRUFBRSxDQUNMLENBQUM7WUFDRixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDOztBQXJDRDs7Ozs7Ozs7OztHQVVHO0FBQ0ksdUJBQVUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDIn0=