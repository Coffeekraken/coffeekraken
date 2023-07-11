"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commonAudioFileExtensions_js_1 = __importDefault(require("./commonAudioFileExtensions.js"));
const commonCompressedFileExtensions_js_1 = __importDefault(require("./commonCompressedFileExtensions.js"));
const commonDataFileExtensions_js_1 = __importDefault(require("./commonDataFileExtensions.js"));
const commonDiscFileExtensions_js_1 = __importDefault(require("./commonDiscFileExtensions.js"));
const commonEmailFileExtensions_js_1 = __importDefault(require("./commonEmailFileExtensions.js"));
const commonExecutableFileExtensions_js_1 = __importDefault(require("./commonExecutableFileExtensions.js"));
const commonFontFileExtensions_js_1 = __importDefault(require("./commonFontFileExtensions.js"));
const commonImageFileExtensions_js_1 = __importDefault(require("./commonImageFileExtensions.js"));
const commonMediaFileExtensions_js_1 = __importDefault(require("./commonMediaFileExtensions.js"));
const commonProgrammingFileExtensions_js_1 = __importDefault(require("./commonProgrammingFileExtensions.js"));
const commonTextFileExtensions_js_1 = __importDefault(require("./commonTextFileExtensions.js"));
const commonVideoFileExtensions_js_1 = __importDefault(require("./commonVideoFileExtensions.js"));
const commonWebFileExtensions_js_1 = __importDefault(require("./commonWebFileExtensions.js"));
const unique_js_1 = __importDefault(require("../array/unique.js"));
function __commonFileExtensions(types = [
    'audio',
    'compressed',
    'data',
    'disc',
    'email',
    'executable',
    'font',
    'image',
    'media',
    'programming',
    'text',
    'video',
    'web',
], settings = {}) {
    const finalSettings = Object.assign({ dot: false, exclude: [] }, settings);
    return (0, unique_js_1.default)([
        ...(types.includes('audio')
            ? (0, commonAudioFileExtensions_js_1.default)(finalSettings)
            : []),
        ...(types.includes('compressed')
            ? (0, commonCompressedFileExtensions_js_1.default)(finalSettings)
            : []),
        ...(types.includes('data')
            ? (0, commonDataFileExtensions_js_1.default)(finalSettings)
            : []),
        ...(types.includes('disc')
            ? (0, commonDiscFileExtensions_js_1.default)(finalSettings)
            : []),
        ...(types.includes('email')
            ? (0, commonEmailFileExtensions_js_1.default)(finalSettings)
            : []),
        ...(types.includes('executable')
            ? (0, commonExecutableFileExtensions_js_1.default)(finalSettings)
            : []),
        ...(types.includes('font')
            ? (0, commonFontFileExtensions_js_1.default)(finalSettings)
            : []),
        ...(types.includes('image')
            ? (0, commonImageFileExtensions_js_1.default)(finalSettings)
            : []),
        ...(types.includes('media')
            ? (0, commonMediaFileExtensions_js_1.default)(finalSettings)
            : []),
        ...(types.includes('programming')
            ? (0, commonProgrammingFileExtensions_js_1.default)(finalSettings)
            : []),
        ...(types.includes('text')
            ? (0, commonTextFileExtensions_js_1.default)(finalSettings)
            : []),
        ...(types.includes('video')
            ? (0, commonVideoFileExtensions_js_1.default)(finalSettings)
            : []),
        ...(types.includes('web')
            ? (0, commonWebFileExtensions_js_1.default)(finalSettings)
            : []),
    ])
        .filter((ext) => !finalSettings.exclude.includes(ext))
        .map((ext) => (finalSettings.dot ? `.${ext}` : ext));
}
exports.default = __commonFileExtensions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0dBQXlFO0FBQ3pFLDRHQUFtRjtBQUNuRixnR0FBdUU7QUFDdkUsZ0dBQXVFO0FBQ3ZFLGtHQUF5RTtBQUN6RSw0R0FBbUY7QUFDbkYsZ0dBQXVFO0FBQ3ZFLGtHQUF5RTtBQUN6RSxrR0FBeUU7QUFDekUsOEdBQXFGO0FBQ3JGLGdHQUF1RTtBQUN2RSxrR0FBeUU7QUFDekUsOEZBQXFFO0FBRXJFLG1FQUEwQztBQTREMUMsU0FBd0Isc0JBQXNCLENBQzFDLFFBQWU7SUFDWCxPQUFPO0lBQ1AsWUFBWTtJQUNaLE1BQU07SUFDTixNQUFNO0lBQ04sT0FBTztJQUNQLFlBQVk7SUFDWixNQUFNO0lBQ04sT0FBTztJQUNQLE9BQU87SUFDUCxhQUFhO0lBQ2IsTUFBTTtJQUNOLE9BQU87SUFDUCxLQUFLO0NBQ1IsRUFDRCxXQUFtRCxFQUFFO0lBRXJELE1BQU0sYUFBYSxtQkFDZixHQUFHLEVBQUUsS0FBSyxFQUNWLE9BQU8sRUFBRSxFQUFFLElBQ1IsUUFBUSxDQUNkLENBQUM7SUFFRixPQUFPLElBQUEsbUJBQVEsRUFBQztRQUNaLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUN2QixDQUFDLENBQUMsSUFBQSxzQ0FBMkIsRUFBQyxhQUFhLENBQUM7WUFDNUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNULEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQztZQUM1QixDQUFDLENBQUMsSUFBQSwyQ0FBZ0MsRUFBQyxhQUFhLENBQUM7WUFDakQsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNULEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUN0QixDQUFDLENBQUMsSUFBQSxxQ0FBMEIsRUFBQyxhQUFhLENBQUM7WUFDM0MsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNULEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUN0QixDQUFDLENBQUMsSUFBQSxxQ0FBMEIsRUFBQyxhQUFhLENBQUM7WUFDM0MsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNULEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUN2QixDQUFDLENBQUMsSUFBQSxzQ0FBMkIsRUFBQyxhQUFhLENBQUM7WUFDNUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNULEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQztZQUM1QixDQUFDLENBQUMsSUFBQSwyQ0FBZ0MsRUFBQyxhQUFhLENBQUM7WUFDakQsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNULEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUN0QixDQUFDLENBQUMsSUFBQSxxQ0FBMEIsRUFBQyxhQUFhLENBQUM7WUFDM0MsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNULEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUN2QixDQUFDLENBQUMsSUFBQSxzQ0FBMkIsRUFBQyxhQUFhLENBQUM7WUFDNUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNULEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUN2QixDQUFDLENBQUMsSUFBQSxzQ0FBMkIsRUFBQyxhQUFhLENBQUM7WUFDNUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNULEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztZQUM3QixDQUFDLENBQUMsSUFBQSw0Q0FBaUMsRUFBQyxhQUFhLENBQUM7WUFDbEQsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNULEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUN0QixDQUFDLENBQUMsSUFBQSxxQ0FBMEIsRUFBQyxhQUFhLENBQUM7WUFDM0MsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNULEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUN2QixDQUFDLENBQUMsSUFBQSxzQ0FBMkIsRUFBQyxhQUFhLENBQUM7WUFDNUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNULEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUNyQixDQUFDLENBQUMsSUFBQSxvQ0FBeUIsRUFBQyxhQUFhLENBQUM7WUFDMUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztLQUNaLENBQUM7U0FDRyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDckQsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDN0QsQ0FBQztBQW5FRCx5Q0FtRUMifQ==