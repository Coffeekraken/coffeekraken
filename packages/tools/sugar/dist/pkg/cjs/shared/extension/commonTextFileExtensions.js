"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commonProgrammingFileExtensions_1 = __importDefault(require("./commonProgrammingFileExtensions"));
/**
 * @name            commonTextFileExtensions
 * @namespace       shared.extension
 * @type            Function
 * @platform       node
 * @platform        js
 * @status         beta
 *
 * This function allows you to get an array of common text file extensions with or without the dot
 *
 * @param       {Boolean}           withDot          If true, the dot will be added to the extension
 * @return     {Array<String>}                           The array of extensions
 *
 * @example         js
 * import { __commonTextFileExtensions } from '@coffeekraken/sugar/extension';
 * const extensions = __commonTextFileExtensions();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __commonTextFileExtensions(settings = {}) {
    const finalSettings = Object.assign({ dot: false, exclude: [] }, settings);
    return [
        'txt',
        'htm',
        'html',
        'md',
        'json',
        'csv',
        'rss',
        'xhtml',
        ...(0, commonProgrammingFileExtensions_1.default)(finalSettings),
    ]
        .filter((ext) => !finalSettings.exclude.includes(ext))
        .map((ext) => (finalSettings.dot ? `.${ext}` : ext));
}
exports.default = __commonTextFileExtensions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esd0dBQWtGO0FBRWxGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsU0FBd0IsMEJBQTBCLENBQzlDLFdBQW1ELEVBQUU7SUFFckQsTUFBTSxhQUFhLG1CQUNmLEdBQUcsRUFBRSxLQUFLLEVBQ1YsT0FBTyxFQUFFLEVBQUUsSUFDUixRQUFRLENBQ2QsQ0FBQztJQUNGLE9BQU87UUFDSCxLQUFLO1FBQ0wsS0FBSztRQUNMLE1BQU07UUFDTixJQUFJO1FBQ0osTUFBTTtRQUNOLEtBQUs7UUFDTCxLQUFLO1FBQ0wsT0FBTztRQUNQLEdBQUcsSUFBQSx5Q0FBaUMsRUFBQyxhQUFhLENBQUM7S0FDdEQ7U0FDSSxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDckQsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDN0QsQ0FBQztBQXJCRCw2Q0FxQkMifQ==