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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLGtGQUF5RDtBQUN6RCxvRkFBMkQ7QUFDM0QsK0NBR2dDO0FBQ2hDLDRDQUFzQjtBQUV0Qjs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILE1BQXFCLGdCQUFnQjtJQWNqQzs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVE7UUFDaEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1lBQ2pDLE1BQU0sU0FBUyxHQUFHLElBQUEsZ0JBQVcsRUFBQyxRQUFRLENBQUMsRUFDbkMsd0JBQXdCLEdBQUcsUUFBUTtpQkFDOUIsT0FBTyxDQUFDLElBQUksU0FBUyxFQUFFLEVBQUUsRUFBRSxDQUFDO2lCQUM1QixPQUFPLENBQUMsOEJBQThCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFckQsSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDO1lBRTVCLElBQUksQ0FBQyxDQUFBLFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQSxFQUFFO2dCQUMvQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2FBQ3ZCO1lBRUQsSUFBSSxZQUFZLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRTtnQkFDL0MsNkJBQTZCO2FBQ2hDO2lCQUFNO2dCQUNILFlBQVksR0FBRyxJQUFBLHNDQUFpQyxFQUM1QyxHQUFHLHdCQUF3QixFQUFFLEVBQzdCLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQ3BELENBQUM7YUFDTDtZQUVELDZDQUE2QztZQUM3QyxJQUFJLENBQUMsQ0FBQSxZQUFZLGFBQVosWUFBWSx1QkFBWixZQUFZLENBQUUsS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUEsRUFBRTtnQkFDL0MsWUFBWSxHQUFHLElBQUksQ0FBQzthQUN2QjtZQUVELElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ2YsT0FBTyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDdEI7WUFFRCxRQUFRLElBQUEsZ0JBQVcsRUFBQyxZQUFZLENBQUMsRUFBRTtnQkFDL0IsS0FBSyxLQUFLO29CQUNOLE9BQU8sT0FBTyxDQUFDLE1BQU0seUJBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztvQkFDeEQsTUFBTTtnQkFDVixLQUFLLElBQUksQ0FBQztnQkFDVixLQUFLLE1BQU07b0JBQ1AsT0FBTyxPQUFPLENBQUMsTUFBTSx3QkFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO29CQUN2RCxNQUFNO2FBQ2I7WUFFRCxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUM7O0FBdEVMLG1DQXVFQztBQXRFRzs7Ozs7Ozs7OztHQVVHO0FBQ0ksMkJBQVUsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMifQ==