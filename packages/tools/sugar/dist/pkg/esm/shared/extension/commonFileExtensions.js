import __commonAudioFileExtensions from './commonAudioFileExtensions.js';
import __commonCompressedFileExtensions from './commonCompressedFileExtensions.js';
import __commonDataFileExtensions from './commonDataFileExtensions.js';
import __commonDiscFileExtensions from './commonDiscFileExtensions.js';
import __commonEmailFileExtensions from './commonEmailFileExtensions.js';
import __commonExecutableFileExtensions from './commonExecutableFileExtensions.js';
import __commonFontFileExtensions from './commonFontFileExtensions.js';
import __commonImageFileExtensions from './commonImageFileExtensions.js';
import __commonMediaFileExtensions from './commonMediaFileExtensions.js';
import __commonProgrammingFileExtensions from './commonProgrammingFileExtensions.js';
import __commonTextFileExtensions from './commonTextFileExtensions.js';
import __commonVideoFileExtensions from './commonVideoFileExtensions.js';
import __commonWebFileExtensions from './commonWebFileExtensions.js';
import __unique from '../array/unique.js';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sMkJBQTJCLE1BQU0sZ0NBQWdDLENBQUM7QUFDekUsT0FBTyxnQ0FBZ0MsTUFBTSxxQ0FBcUMsQ0FBQztBQUNuRixPQUFPLDBCQUEwQixNQUFNLCtCQUErQixDQUFDO0FBQ3ZFLE9BQU8sMEJBQTBCLE1BQU0sK0JBQStCLENBQUM7QUFDdkUsT0FBTywyQkFBMkIsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN6RSxPQUFPLGdDQUFnQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ25GLE9BQU8sMEJBQTBCLE1BQU0sK0JBQStCLENBQUM7QUFDdkUsT0FBTywyQkFBMkIsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN6RSxPQUFPLDJCQUEyQixNQUFNLGdDQUFnQyxDQUFDO0FBQ3pFLE9BQU8saUNBQWlDLE1BQU0sc0NBQXNDLENBQUM7QUFDckYsT0FBTywwQkFBMEIsTUFBTSwrQkFBK0IsQ0FBQztBQUN2RSxPQUFPLDJCQUEyQixNQUFNLGdDQUFnQyxDQUFDO0FBQ3pFLE9BQU8seUJBQXlCLE1BQU0sOEJBQThCLENBQUM7QUFFckUsT0FBTyxRQUFRLE1BQU0sb0JBQW9CLENBQUM7QUE0RDFDLE1BQU0sQ0FBQyxPQUFPLFVBQVUsc0JBQXNCLENBQzFDLFFBQWU7SUFDWCxPQUFPO0lBQ1AsWUFBWTtJQUNaLE1BQU07SUFDTixNQUFNO0lBQ04sT0FBTztJQUNQLFlBQVk7SUFDWixNQUFNO0lBQ04sT0FBTztJQUNQLE9BQU87SUFDUCxhQUFhO0lBQ2IsTUFBTTtJQUNOLE9BQU87SUFDUCxLQUFLO0NBQ1IsRUFDRCxXQUFtRCxFQUFFO0lBRXJELE1BQU0sYUFBYSxtQkFDZixHQUFHLEVBQUUsS0FBSyxFQUNWLE9BQU8sRUFBRSxFQUFFLElBQ1IsUUFBUSxDQUNkLENBQUM7SUFFRixPQUFPLFFBQVEsQ0FBQztRQUNaLEdBQUcsQ0FBQyxLQUFLLENBQUMs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