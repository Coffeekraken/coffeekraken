import __commonAudioFileExtensions from './commonAudioFileExtensions';
import __commonCompressedFileExtensions from './commonCompressedFileExtensions';
import __commonDataFileExtensions from './commonDataFileExtensions';
import __commonDiscFileExtensions from './commonDiscFileExtensions';
import __commonEmailFileExtensions from './commonEmailFileExtensions';
import __commonExecutableFileExtensions from './commonExecutableFileExtensions';
import __commonFontFileExtensions from './commonFontFileExtensions';
import __commonImageFileExtensions from './commonImageFileExtensions';
import __commonMediaFileExtensions from './commonMediaFileExtensions';
import __commonProgrammingFileExtensions from './commonProgrammingFileExtensions';
import __commonTextFileExtensions from './commonTextFileExtensions';
import __commonVideoFileExtensions from './commonVideoFileExtensions';
import __commonWebFileExtensions from './commonWebFileExtensions';
import __unique from '../array/unique';
export default function __commonFileExtensions(types = [
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
    return __unique([
        ...(types.includes('audio')
            ? __commonAudioFileExtensions(finalSettings)
            : []),
        ...(types.includes('compressed')
            ? __commonCompressedFileExtensions(finalSettings)
            : []),
        ...(types.includes('data')
            ? __commonDataFileExtensions(finalSettings)
            : []),
        ...(types.includes('disc')
            ? __commonDiscFileExtensions(finalSettings)
            : []),
        ...(types.includes('email')
            ? __commonEmailFileExtensions(finalSettings)
            : []),
        ...(types.includes('executable')
            ? __commonExecutableFileExtensions(finalSettings)
            : []),
        ...(types.includes('font')
            ? __commonFontFileExtensions(finalSettings)
            : []),
        ...(types.includes('image')
            ? __commonImageFileExtensions(finalSettings)
            : []),
        ...(types.includes('media')
            ? __commonMediaFileExtensions(finalSettings)
            : []),
        ...(types.includes('programming')
            ? __commonProgrammingFileExtensions(finalSettings)
            : []),
        ...(types.includes('text')
            ? __commonTextFileExtensions(finalSettings)
            : []),
        ...(types.includes('video')
            ? __commonVideoFileExtensions(finalSettings)
            : []),
        ...(types.includes('web')
            ? __commonWebFileExtensions(finalSettings)
            : []),
    ])
        .filter((ext) => !finalSettings.exclude.includes(ext))
        .map((ext) => (finalSettings.dot ? `.${ext}` : ext));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sMkJBQTJCLE1BQU0sNkJBQTZCLENBQUM7QUFDdEUsT0FBTyxnQ0FBZ0MsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRixPQUFPLDBCQUEwQixNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sMEJBQTBCLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTywyQkFBMkIsTUFBTSw2QkFBNkIsQ0FBQztBQUN0RSxPQUFPLGdDQUFnQyxNQUFNLGtDQUFrQyxDQUFDO0FBQ2hGLE9BQU8sMEJBQTBCLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTywyQkFBMkIsTUFBTSw2QkFBNkIsQ0FBQztBQUN0RSxPQUFPLDJCQUEyQixNQUFNLDZCQUE2QixDQUFDO0FBQ3RFLE9BQU8saUNBQWlDLE1BQU0sbUNBQW1DLENBQUM7QUFDbEYsT0FBTywwQkFBMEIsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLDJCQUEyQixNQUFNLDZCQUE2QixDQUFDO0FBQ3RFLE9BQU8seUJBQXlCLE1BQU0sMkJBQTJCLENBQUM7QUFFbEUsT0FBTyxRQUFRLE1BQU0saUJBQWlCLENBQUM7QUE0RHZDLE1BQU0sQ0FBQyxPQUFPLFVBQVUsc0JBQXNCLENBQzFDLFFBQWU7SUFDWCxPQUFPO0lBQ1AsWUFBWTtJQUNaLE1BQU07SUFDTixNQUFNO0lBQ04sT0FBTztJQUNQLFlBQVk7SUFDWixNQUFNO0lBQ04sT0FBTztJQUNQLE9BQU87SUFDUCxhQUFhO0lBQ2IsTUFBTTtJQUNOLE9BQU87SUFDUCxLQUFLO0NBQ1IsRUFDRCxXQUFtRCxFQUFFO0lBRXJELE1BQU0sYUFBYSxtQkFDZixHQUFHLEVBQUUsS0FBSyxFQUNWLE9BQU8sRUFBRSxFQUFFLElBQ1IsUUFBUSxDQUNkLENBQUM7SUFFRixPQUFPLFFBQVEsQ0FBQztRQUNaLEdBQUcsQ0FBQyxLQUFLLENBQUMs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