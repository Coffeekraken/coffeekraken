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
const fs_1 = require("@coffeekraken/sugar/fs");
const fs_2 = __importDefault(require("fs"));
/**
 * @name          SDataFileGeneric
 * @namespace     node
 * @type          Class
 * @platform        node
 * @status              beta
 * @private
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
     * @return      {Promise}                  An Promise instance that will be resolved with the resulting object
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static load(filePath) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLGtGQUF5RDtBQUN6RCxvRkFBMkQ7QUFDM0QsK0NBR2dDO0FBQ2hDLDRDQUFzQjtBQUV0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxNQUFxQixnQkFBZ0I7SUFjakM7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRO1FBQ2hCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtZQUNqQyxNQUFNLFNBQVMsR0FBRyxJQUFBLGdCQUFXLEVBQUMsUUFBUSxDQUFDLEVBQ25DLHdCQUF3QixHQUFHLFFBQVE7aUJBQzlCLE9BQU8sQ0FBQyxJQUFJLFNBQVMsRUFBRSxFQUFFLEVBQUUsQ0FBQztpQkFDNUIsT0FBTyxDQUFDLDhCQUE4QixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRXJELElBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQztZQUU1QixJQUFJLENBQUMsQ0FBQSxZQUFZLGFBQVosWUFBWSx1QkFBWixZQUFZLENBQUUsS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUEsRUFBRTtnQkFDL0MsWUFBWSxHQUFHLElBQUksQ0FBQzthQUN2QjtZQUVELElBQUksWUFBWSxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQy9DLDZCQUE2QjthQUNoQztpQkFBTTtnQkFDSCxZQUFZLEdBQUcsSUFBQSxzQ0FBaUMsRUFDNUMsR0FBRyx3QkFBd0IsRUFBRSxFQUM3QixnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUNwRCxDQUFDO2FBQ0w7WUFFRCw2Q0FBNkM7WUFDN0MsSUFBSSxDQUFDLENBQUEsWUFBWSxhQUFaLFlBQVksdUJBQVosWUFBWSxDQUFFLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBLEVBQUU7Z0JBQy9DLFlBQVksR0FBRyxJQUFJLENBQUM7YUFDdkI7WUFFRCxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNmLE9BQU8sT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3RCO1lBRUQsUUFBUSxJQUFBLGdCQUFXLEVBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQy9CLEtBQUssS0FBSztvQkFDTixPQUFPLE9BQU8sQ0FBQyxNQUFNLHlCQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7b0JBQ3hELE1BQU07Z0JBQ1YsS0FBSyxJQUFJLENBQUM7Z0JBQ1YsS0FBSyxNQUFNO29CQUNQLE9BQU8sT0FBTyxDQUFDLE1BQU0sd0JBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztvQkFDdkQsTUFBTTthQUNiO1lBRUQsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDOztBQXRFTCxtQ0F1RUM7QUF0RUc7Ozs7Ozs7Ozs7R0FVRztBQUNJLDJCQUFVLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDIn0=