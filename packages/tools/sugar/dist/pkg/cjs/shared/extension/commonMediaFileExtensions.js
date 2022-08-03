"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commonAudioFileExtensions_1 = __importDefault(require("./commonAudioFileExtensions"));
const commonImageFileExtensions_1 = __importDefault(require("./commonImageFileExtensions"));
const commonVideoFileExtensions_1 = __importDefault(require("./commonVideoFileExtensions"));
const unique_1 = __importDefault(require("../array/unique"));
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
 * @example         js
 * import __commonMediaFileExtensions from '@coffeekraken/sugar/shared/extension/commonMediaFileExtensions';
 * const extensions = __commonMediaFileExtensions(); // => ['avi','mp3',...]
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function commonMediaFileExtensions(settings = {}) {
    const finalSettings = Object.assign({ dot: false, exclude: [] }, settings);
    return (0, unique_1.default)([
        ...(0, commonImageFileExtensions_1.default)(finalSettings),
        ...(0, commonVideoFileExtensions_1.default)(finalSettings),
        ...(0, commonAudioFileExtensions_1.default)(finalSettings),
    ])
        .filter((ext) => !finalSettings.exclude.includes(ext))
        .map((ext) => (finalSettings.dot ? `.${ext}` : ext));
}
exports.default = commonMediaFileExtensions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsNEZBQXNFO0FBQ3RFLDRGQUFzRTtBQUN0RSw0RkFBc0U7QUFFdEUsNkRBQXVDO0FBRXZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsU0FBd0IseUJBQXlCLENBQzdDLFdBQW1ELEVBQUU7SUFFckQsTUFBTSxhQUFhLG1CQUNmLEdBQUcsRUFBRSxLQUFLLEVBQ1YsT0FBTyxFQUFFLEVBQUUsSUFDUixRQUFRLENBQ2QsQ0FBQztJQUNGLE9BQU8sSUFBQSxnQkFBUSxFQUFDO1FBQ1osR0FBRyxJQUFBLG1DQUEyQixFQUFDLGFBQWEsQ0FBQztRQUM3QyxHQUFHLElBQUEsbUNBQTJCLEVBQUMsYUFBYSxDQUFDO1FBQzdDLEdBQUcsSUFBQSxtQ0FBMkIsRUFBQyxhQUFhLENBQUM7S0FDaEQsQ0FBQztTQUNHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNyRCxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM3RCxDQUFDO0FBZkQsNENBZUMifQ==