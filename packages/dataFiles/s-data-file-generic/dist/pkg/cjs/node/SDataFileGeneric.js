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
const fs_1 = require("@coffeekraken/sugar/fs");
const fs_2 = __importDefault(require("fs"));
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
            const extension = (0, fs_1.__extension)(filePath), filePathWithoutExtension = filePath.replace(`.${extension}`, '');
            let dataFilePath = filePath;
            if (!fs_2.default.existsSync(dataFilePath) ||
                !SDataHandlerGeneric.extensions.includes(extension)) {
                dataFilePath = (0, fs_1.__checkPathWithMultipleExtensions)(`${filePathWithoutExtension}.data.${extension}`, SDataHandlerGeneric.extensions);
            }
            if (!dataFilePath) {
                return resolve({});
            }
            switch ((0, fs_1.__extension)(dataFilePath)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLGtGQUF5RDtBQUN6RCxvRkFBMkQ7QUFDM0Qsd0VBQWlEO0FBQ2pELCtDQUdnQztBQUNoQyw0Q0FBc0I7QUFFdEI7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBcUIsbUJBQW1CO0lBY3BDOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUTtRQUNoQixPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7WUFDaEQsTUFBTSxTQUFTLEdBQUcsSUFBQSxnQkFBVyxFQUFDLFFBQVEsQ0FBQyxFQUNuQyx3QkFBd0IsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUN2QyxJQUFJLFNBQVMsRUFBRSxFQUNmLEVBQUUsQ0FDTCxDQUFDO1lBRU4sSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDO1lBQzVCLElBQ0ksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQztnQkFDOUIsQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUNyRDtnQkFDRSxZQUFZLEdBQUcsSUFBQSxzQ0FBaUMsRUFDNUMsR0FBRyx3QkFBd0IsU0FBUyxTQUFTLEVBQUUsRUFDL0MsbUJBQW1CLENBQUMsVUFBVSxDQUNqQyxDQUFDO2FBQ0w7WUFFRCxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNmLE9BQU8sT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3RCO1lBRUQsUUFBUSxJQUFBLGdCQUFXLEVBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQy9CLEtBQUssS0FBSztvQkFDTixPQUFPLE9BQU8sQ0FBQyxNQUFNLHlCQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7b0JBQ3hELE1BQU07Z0JBQ1YsS0FBSyxJQUFJLENBQUM7Z0JBQ1YsS0FBSyxNQUFNO29CQUNQLE9BQU8sT0FBTyxDQUFDLE1BQU0sd0JBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztvQkFDdkQsTUFBTTthQUNiO1lBRUQsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDOztBQTlETCxzQ0ErREM7QUE5REc7Ozs7Ozs7Ozs7R0FVRztBQUNJLDhCQUFVLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDIn0=