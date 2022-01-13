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
export default function commonFileExtensions(types = ['audio', 'compressed', 'data', 'disc', 'email', 'executable', 'font', 'image', 'media', 'programming', 'text', 'video', 'web'], withDot = false) {
    return __unique([
        ...(types.includes('audio') ? __commonAudioFileExtensions(false) : []),
        ...(types.includes('compressed') ? __commonCompressedFileExtensions(false) : []),
        ...(types.includes('data') ? __commonDataFileExtensions(false) : []),
        ...(types.includes('disc') ? __commonDiscFileExtensions(false) : []),
        ...(types.includes('email') ? __commonEmailFileExtensions(false) : []),
        ...(types.includes('executable') ? __commonExecutableFileExtensions(false) : []),
        ...(types.includes('font') ? __commonFontFileExtensions(false) : []),
        ...(types.includes('image') ? __commonImageFileExtensions(false) : []),
        ...(types.includes('media') ? __commonMediaFileExtensions(false) : []),
        ...(types.includes('programming') ? __commonProgrammingFileExtensions(false) : []),
        ...(types.includes('text') ? __commonTextFileExtensions(false) : []),
        ...(types.includes('video') ? __commonVideoFileExtensions(false) : []),
        ...(types.includes('web') ? __commonWebFileExtensions(false) : []),
    ]).map(ext => withDot ? `.${ext}` : ext);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uRmlsZUV4dGVuc2lvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21tb25GaWxlRXh0ZW5zaW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLDJCQUEyQixNQUFNLDZCQUE2QixDQUFDO0FBQ3RFLE9BQU8sZ0NBQWdDLE1BQU0sa0NBQWtDLENBQUM7QUFDaEYsT0FBTywwQkFBMEIsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLDBCQUEwQixNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sMkJBQTJCLE1BQU0sNkJBQTZCLENBQUM7QUFDdEUsT0FBTyxnQ0FBZ0MsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRixPQUFPLDBCQUEwQixNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sMkJBQTJCLE1BQU0sNkJBQTZCLENBQUM7QUFDdEUsT0FBTywyQkFBMkIsTUFBTSw2QkFBNkIsQ0FBQztBQUN0RSxPQUFPLGlDQUFpQyxNQUFNLG1DQUFtQyxDQUFDO0FBQ2xGLE9BQU8sMEJBQTBCLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTywyQkFBMkIsTUFBTSw2QkFBNkIsQ0FBQztBQUN0RSxPQUFPLHlCQUF5QixNQUFNLDJCQUEyQixDQUFDO0FBRWxFLE9BQU8sUUFBUSxNQUFNLGlCQUFpQixDQUFDO0FBdUN2QyxNQUFNLENBQUMsT0FBTyxVQUFVLG9CQUFvQixDQUFDLFFBQWUsQ0FBQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEdBQUcsS0FBSztJQUM1TCxPQUFPLFFBQVEsQ0FBQztRQUNaLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3RFLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQ0FBZ0MsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2hGLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3BFLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3BFLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3RFLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQ0FBZ0MsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2hGLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3BFLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3RFLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3RFLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQ0FBaUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2xGLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3BFLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3RFLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0tBQ3JFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzdDLENBQUMifQ==