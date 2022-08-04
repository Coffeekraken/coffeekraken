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
const s_data_file_js_1 = __importDefault(require("@coffeekraken/s-data-file-js"));
const s_data_file_php_1 = __importDefault(require("@coffeekraken/s-data-file-php"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const checkPathWithMultipleExtensions_1 = __importDefault(require("@coffeekraken/sugar/node/fs/checkPathWithMultipleExtensions"));
const extension_1 = __importDefault(require("@coffeekraken/sugar/node/fs/extension"));
const fs_1 = __importDefault(require("fs"));
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
class SDataHandlerGeneric {
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
        return new s_promise_1.default(({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
            const extension = (0, extension_1.default)(filePath), filePathWithoutExtension = filePath.replace(`.${extension}`, '');
            let dataFilePath = filePath;
            if (!fs_1.default.existsSync(dataFilePath)) {
                dataFilePath = (0, checkPathWithMultipleExtensions_1.default)(`${filePathWithoutExtension}.data.${extension}`, SDataHandlerGeneric.extensions);
            }
            if (!dataFilePath) {
                return resolve({});
            }
            switch ((0, extension_1.default)(dataFilePath)) {
                case 'php':
                    return resolve(yield s_data_file_php_1.default.load(dataFilePath));
                    break;
                case 'js':
                case 'json':
                    return resolve(yield s_data_file_js_1.default.load(dataFilePath));
                    break;
            }
            resolve({});
        }));
    }
}
exports.default = SDataHandlerGeneric;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLGtGQUF5RDtBQUN6RCxvRkFBMkQ7QUFDM0Qsd0VBQWlEO0FBQ2pELGtJQUE0RztBQUM1RyxzRkFBZ0U7QUFDaEUsNENBQXNCO0FBRXRCOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILE1BQXFCLG1CQUFtQjtJQWNwQzs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVE7UUFDaEIsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1lBQ2hELE1BQU0sU0FBUyxHQUFHLElBQUEsbUJBQVcsRUFBQyxRQUFRLENBQUMsRUFDbkMsd0JBQXdCLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FDdkMsSUFBSSxTQUFTLEVBQUUsRUFDZixFQUFFLENBQ0wsQ0FBQztZQUVOLElBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQztZQUM1QixJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRTtnQkFDaEMsWUFBWSxHQUFHLElBQUEseUNBQWlDLEVBQzVDLEdBQUcsd0JBQXdCLFNBQVMsU0FBUyxFQUFFLEVBQy9DLG1CQUFtQixDQUFDLFVBQVUsQ0FDakMsQ0FBQzthQUNMO1lBRUQsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDZixPQUFPLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN0QjtZQUVELFFBQVEsSUFBQSxtQkFBVyxFQUFDLFlBQVksQ0FBQyxFQUFFO2dCQUMvQixLQUFLLEtBQUs7b0JBQ04sT0FBTyxPQUFPLENBQUMsTUFBTSx5QkFBYyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO29CQUN4RCxNQUFNO2dCQUNWLEtBQUssSUFBSSxDQUFDO2dCQUNWLEtBQUssTUFBTTtvQkFDUCxPQUFPLE9BQU8sQ0FBQyxNQUFNLHdCQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7b0JBQ3ZELE1BQU07YUFDYjtZQUVELE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7QUEzREwsc0NBNERDO0FBM0RHOzs7Ozs7Ozs7O0dBVUc7QUFDSSw4QkFBVSxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyJ9