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
class SDataFileGeneric {
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
            const extension = (0, fs_1.__extension)(filePath), filePathWithoutExtension = filePath
                .replace(`.${extension}`, '')
                .replace(/\.(data|spec)\.[a-zA-Z0-9]+$/, '');
            let dataFilePath = filePath;
            if (!(dataFilePath === null || dataFilePath === void 0 ? void 0 : dataFilePath.match(/\.data\.[a-zA-Z0-9]+$/))) {
                dataFilePath = null;
            }
            if (dataFilePath && fs_2.default.existsSync(dataFilePath)) {
                // direct data file reference
            }
            else {
                dataFilePath = (0, fs_1.__checkPathWithMultipleExtensions)(`${filePathWithoutExtension}`, SDataFileGeneric.extensions.map(p => `data.${p}`));
            }
            // make sure the file is a .data.something...
            if (!(dataFilePath === null || dataFilePath === void 0 ? void 0 : dataFilePath.match(/\.data\.[a-zA-Z0-9]+$/))) {
                dataFilePath = null;
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
exports.default = SDataFileGeneric;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLGtGQUF5RDtBQUN6RCxvRkFBMkQ7QUFDM0Qsd0VBQWlEO0FBQ2pELCtDQUdnQztBQUNoQyw0Q0FBc0I7QUFFdEI7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBcUIsZ0JBQWdCO0lBY2pDOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUTtRQUNoQixPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7WUFDaEQsTUFBTSxTQUFTLEdBQUcsSUFBQSxnQkFBVyxFQUFDLFFBQVEsQ0FBQyxFQUNuQyx3QkFBd0IsR0FBRyxRQUFRO2lCQUM5QixPQUFPLENBQUMsSUFBSSxTQUFTLEVBQUUsRUFBRSxFQUFFLENBQUM7aUJBQzVCLE9BQU8sQ0FBQyw4QkFBOEIsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUVyRCxJQUFJLFlBQVksR0FBRyxRQUFRLENBQUM7WUFFNUIsSUFBSSxDQUFDLENBQUEsWUFBWSxhQUFaLFlBQVksdUJBQVosWUFBWSxDQUFFLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBLEVBQUU7Z0JBQy9DLFlBQVksR0FBRyxJQUFJLENBQUM7YUFDdkI7WUFFRCxJQUFJLFlBQVksSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFO2dCQUMvQyw2QkFBNkI7YUFDaEM7aUJBQU07Z0JBQ0gsWUFBWSxHQUFHLElBQUEsc0NBQWlDLEVBQzVDLEdBQUcsd0JBQXdCLEVBQUUsRUFDN0IsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FDcEQsQ0FBQzthQUNMO1lBRUQsNkNBQTZDO1lBQzdDLElBQUksQ0FBQyxDQUFBLFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQSxFQUFFO2dCQUMvQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2FBQ3ZCO1lBRUQsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDZixPQUFPLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN0QjtZQUVELFFBQVEsSUFBQSxnQkFBVyxFQUFDLFlBQVksQ0FBQyxFQUFFO2dCQUMvQixLQUFLLEtBQUs7b0JBQ04sT0FBTyxPQUFPLENBQUMsTUFBTSx5QkFBYyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO29CQUN4RCxNQUFNO2dCQUNWLEtBQUssSUFBSSxDQUFDO2dCQUNWLEtBQUssTUFBTTtvQkFDUCxPQUFPLE9BQU8sQ0FBQyxNQUFNLHdCQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7b0JBQ3ZELE1BQU07YUFDYjtZQUVELE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7QUF0RUwsbUNBdUVDO0FBdEVHOzs7Ozs7Ozs7O0dBVUc7QUFDSSwyQkFBVSxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyJ9