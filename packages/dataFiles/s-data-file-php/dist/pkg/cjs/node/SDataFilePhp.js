"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
const execPhp_1 = __importDefault(require("@coffeekraken/sugar/node/php/execPhp"));
const path_1 = __importDefault(require("path"));
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
class SDataFilePhp {
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
        return new s_promise_1.default(({ resolve }) => __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, execPhp_1.default)(path_1.default.resolve(__packageRoot((0, dirname_1.default)()), 'src/php/data.php'), {
                filePath,
            }, {});
            resolve(JSON.parse(data));
        }));
    }
}
exports.default = SDataFilePhp;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLHdFQUFpRDtBQUNqRCxrRkFBNEQ7QUFDNUQsbUZBQTZEO0FBQzdELGdEQUEwQjtBQUUxQjs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILE1BQXFCLFlBQVk7SUFjN0I7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRO1FBQ2hCLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQ3hDLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBQSxpQkFBUyxFQUN4QixjQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFBLGlCQUFTLEdBQUUsQ0FBQyxFQUFFLGtCQUFrQixDQUFDLEVBQzlEO2dCQUNJLFFBQVE7YUFDWCxFQUNELEVBQUUsQ0FDTCxDQUFDO1lBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7QUF0Q0wsK0JBdUNDO0FBdENHOzs7Ozs7Ozs7O0dBVUc7QUFDSSx1QkFBVSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMifQ==