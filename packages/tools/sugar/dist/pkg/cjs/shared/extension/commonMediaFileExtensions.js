"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commonAudioFileExtensions_js_1 = __importDefault(require("./commonAudioFileExtensions.js"));
const commonImageFileExtensions_js_1 = __importDefault(require("./commonImageFileExtensions.js"));
const commonVideoFileExtensions_js_1 = __importDefault(require("./commonVideoFileExtensions.js"));
const unique_js_1 = __importDefault(require("../array/unique.js"));
/**
 * @name            commonMediaFileExtensions
 * @namespace       shared.extension
 * @type            Function
 * @platform       node
 * @platform        js
 * @status         beta
 *
 * This function allows you to get an array of common media file extensions with or without the dot
 *
 * @param       {Boolean}           withDot          If true, the dot will be added to the extension
 * @return     {Array<String>}                           The array of extensions
 *
 * @snippet         __commonMediaFileExtensions()
 *
 * @example         js
 * import { __commonMediaFileExtensions } from '@coffeekraken/sugar/extension';
 * const extensions = __commonMediaFileExtensions(); // => ['avi','mp3',...]
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __commonMediaFileExtensions(settings = {}) {
    const finalSettings = Object.assign({ dot: false, exclude: [] }, settings);
    return (0, unique_js_1.default)([
        ...(0, commonImageFileExtensions_js_1.default)(finalSettings),
        ...(0, commonVideoFileExtensions_js_1.default)(finalSettings),
        ...(0, commonAudioFileExtensions_js_1.default)(finalSettings),
    ])
        .filter((ext) => !finalSettings.exclude.includes(ext))
        .map((ext) => (finalSettings.dot ? `.${ext}` : ext));
}
exports.default = __commonMediaFileExtensions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsa0dBQXlFO0FBQ3pFLGtHQUF5RTtBQUN6RSxrR0FBeUU7QUFFekUsbUVBQTBDO0FBRTFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxTQUF3QiwyQkFBMkIsQ0FDL0MsV0FBbUQsRUFBRTtJQUVyRCxNQUFNLGFBQWEsbUJBQ2YsR0FBRyxFQUFFLEtBQUssRUFDVixPQUFPLEVBQUUsRUFBRSxJQUNSLFFBQVEsQ0FDZCxDQUFDO0lBQ0YsT0FBTyxJQUFBLG1CQUFRLEVBQUM7UUFDWixHQUFHLElBQUEsc0NBQTJCLEVBQUMsYUFBYSxDQUFDO1FBQzdDLEdBQUcsSUFBQSxzQ0FBMkIsRUFBQyxhQUFhLENBQUM7UUFDN0MsR0FBRyxJQUFBLHNDQUEyQixFQUFDLGFBQWEsQ0FBQztLQUNoRCxDQUFDO1NBQ0csTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3JELEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzdELENBQUM7QUFmRCw4Q0FlQyJ9