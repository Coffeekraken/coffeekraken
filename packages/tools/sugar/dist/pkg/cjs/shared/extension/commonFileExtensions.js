"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commonAudioFileExtensions_1 = __importDefault(require("./commonAudioFileExtensions"));
const commonCompressedFileExtensions_1 = __importDefault(require("./commonCompressedFileExtensions"));
const commonDataFileExtensions_1 = __importDefault(require("./commonDataFileExtensions"));
const commonDiscFileExtensions_1 = __importDefault(require("./commonDiscFileExtensions"));
const commonEmailFileExtensions_1 = __importDefault(require("./commonEmailFileExtensions"));
const commonExecutableFileExtensions_1 = __importDefault(require("./commonExecutableFileExtensions"));
const commonFontFileExtensions_1 = __importDefault(require("./commonFontFileExtensions"));
const commonImageFileExtensions_1 = __importDefault(require("./commonImageFileExtensions"));
const commonMediaFileExtensions_1 = __importDefault(require("./commonMediaFileExtensions"));
const commonProgrammingFileExtensions_1 = __importDefault(require("./commonProgrammingFileExtensions"));
const commonTextFileExtensions_1 = __importDefault(require("./commonTextFileExtensions"));
const commonVideoFileExtensions_1 = __importDefault(require("./commonVideoFileExtensions"));
const commonWebFileExtensions_1 = __importDefault(require("./commonWebFileExtensions"));
const unique_1 = __importDefault(require("../array/unique"));
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
    return (0, unique_1.default)([
        ...(types.includes('audio')
            ? (0, commonAudioFileExtensions_1.default)(finalSettings)
            : []),
        ...(types.includes('compressed')
            ? (0, commonCompressedFileExtensions_1.default)(finalSettings)
            : []),
        ...(types.includes('data')
            ? (0, commonDataFileExtensions_1.default)(finalSettings)
            : []),
        ...(types.includes('disc')
            ? (0, commonDiscFileExtensions_1.default)(finalSettings)
            : []),
        ...(types.includes('email')
            ? (0, commonEmailFileExtensions_1.default)(finalSettings)
            : []),
        ...(types.includes('executable')
            ? (0, commonExecutableFileExtensions_1.default)(finalSettings)
            : []),
        ...(types.includes('font')
            ? (0, commonFontFileExtensions_1.default)(finalSettings)
            : []),
        ...(types.includes('image')
            ? (0, commonImageFileExtensions_1.default)(finalSettings)
            : []),
        ...(types.includes('media')
            ? (0, commonMediaFileExtensions_1.default)(finalSettings)
            : []),
        ...(types.includes('programming')
            ? (0, commonProgrammingFileExtensions_1.default)(finalSettings)
            : []),
        ...(types.includes('text')
            ? (0, commonTextFileExtensions_1.default)(finalSettings)
            : []),
        ...(types.includes('video')
            ? (0, commonVideoFileExtensions_1.default)(finalSettings)
            : []),
        ...(types.includes('web')
            ? (0, commonWebFileExtensions_1.default)(finalSettings)
            : []),
    ])
        .filter((ext) => !finalSettings.exclude.includes(ext))
        .map((ext) => (finalSettings.dot ? `.${ext}` : ext));
}
exports.default = __commonFileExtensions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEZBQXNFO0FBQ3RFLHNHQUFnRjtBQUNoRiwwRkFBb0U7QUFDcEUsMEZBQW9FO0FBQ3BFLDRGQUFzRTtBQUN0RSxzR0FBZ0Y7QUFDaEYsMEZBQW9FO0FBQ3BFLDRGQUFzRTtBQUN0RSw0RkFBc0U7QUFDdEUsd0dBQWtGO0FBQ2xGLDBGQUFvRTtBQUNwRSw0RkFBc0U7QUFDdEUsd0ZBQWtFO0FBRWxFLDZEQUF1QztBQTREdkMsU0FBd0Isc0JBQXNCLENBQzFDLFFBQWU7SUFDWCxPQUFPO0lBQ1AsWUFBWTtJQUNaLE1BQU07SUFDTixNQUFNO0lBQ04sT0FBTztJQUNQLFlBQVk7SUFDWixNQUFNO0lBQ04sT0FBTztJQUNQLE9BQU87SUFDUCxhQUFhO0lBQ2IsTUFBTTtJQUNOLE9BQU87SUFDUCxLQUFLO0NBQ1IsRUFDRCxXQUFtRCxFQUFFO0lBRXJELE1BQU0sYUFBYSxtQkFDZixHQUFHLEVBQUUsS0FBSyxFQUNWLE9BQU8sRUFBRSxFQUFFLElBQ1IsUUFBUSxDQUNkLENBQUM7SUFFRixPQUFPLElBQUEsZ0JBQVEsRUFBQztRQUNaLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUN2QixDQUFDLENBQUMsSUFBQSxtQ0FBMkIsRUFBQyxhQUFhLENBQUM7WUFDNUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNULEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQztZQUM1QixDQUFDLENBQUMsSUFBQSx3Q0FBZ0MsRUFBQyxhQUFhLENBQUM7WUFDakQsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNULEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUN0QixDQUFDLENBQUMsSUFBQSxrQ0FBMEIsRUFBQyxhQUFhLENBQUM7WUFDM0MsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNULEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUN0QixDQUFDLENBQUMsSUFBQSxrQ0FBMEIsRUFBQyxhQUFhLENBQUM7WUFDM0MsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNULEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUN2QixDQUFDLENBQUMsSUFBQSxtQ0FBMkIsRUFBQyxhQUFhLENBQUM7WUFDNUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNULEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQztZQUM1QixDQUFDLENBQUMsSUFBQSx3Q0FBZ0MsRUFBQyxhQUFhLENBQUM7WUFDakQsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNULEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUN0QixDQUFDLENBQUMsSUFBQSxrQ0FBMEIsRUFBQyxhQUFhLENBQUM7WUFDM0MsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNULEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUN2QixDQUFDLENBQUMsSUFBQSxtQ0FBMkIsRUFBQyxhQUFhLENBQUM7WUFDNUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNULEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUN2QixDQUFDLENBQUMsSUFBQSxtQ0FBMkIsRUFBQyxhQUFhLENBQUM7WUFDNUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNULEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztZQUM3QixDQUFDLENBQUMsSUFBQSx5Q0FBaUMsRUFBQyxhQUFhLENBQUM7WUFDbEQsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNULEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUN0QixDQUFDLENBQUMsSUFBQSxrQ0FBMEIsRUFBQyxhQUFhLENBQUM7WUFDM0MsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNULEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUN2QixDQUFDLENBQUMsSUFBQSxtQ0FBMkIsRUFBQyxhQUFhLENBQUM7WUFDNUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNULEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUNyQixDQUFDLENBQUMsSUFBQSxpQ0FBeUIsRUFBQyxhQUFhLENBQUM7WUFDMUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztLQUNaLENBQUM7U0FDRyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDckQsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDN0QsQ0FBQztBQW5FRCx5Q0FtRUMifQ==