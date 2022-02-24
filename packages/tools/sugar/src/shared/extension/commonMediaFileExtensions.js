import __commonImageFileExtensions from './commonImageFileExtensions';
import __commonVideoFileExtensions from './commonVideoFileExtensions';
import __commonAudioFileExtensions from './commonAudioFileExtensions';
import __unique from '../array/unique';
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
 * @param       {Boolean}           withDot          If true, the dot will be added to the extension
 * @return     {Array<String>}                           The array of extensions
 *
 * @example         js
 * import __commonMediaFileExtensions from '@coffeekraken/sugar/shared/extension/commonMediaFileExtensions';
 * const extensions = __commonMediaFileExtensions(); // => ['avi','mp3',...]
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function commonMediaFileExtensions(withDot = false) {
    return __unique([
        ...__commonImageFileExtensions(false),
        ...__commonVideoFileExtensions(false),
        ...__commonAudioFileExtensions(false)
    ]).map(ext => withDot ? `.${ext}` : ext);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uTWVkaWFGaWxlRXh0ZW5zaW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbW1vbk1lZGlhRmlsZUV4dGVuc2lvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTywyQkFBMkIsTUFBTSw2QkFBNkIsQ0FBQztBQUN0RSxPQUFPLDJCQUEyQixNQUFNLDZCQUE2QixDQUFDO0FBQ3RFLE9BQU8sMkJBQTJCLE1BQU0sNkJBQTZCLENBQUM7QUFFdEUsT0FBTyxRQUFRLE1BQU0saUJBQWlCLENBQUM7QUFFdkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLHlCQUF5QixDQUFDLE9BQU8sR0FBRyxLQUFLO0lBQzdELE9BQU8sUUFBUSxDQUFDO1FBQ1osR0FBRywyQkFBMkIsQ0FBQyxLQUFLLENBQUM7UUFDckMsR0FBRywyQkFBMkIsQ0FBQyxLQUFLLENBQUM7UUFDckMsR0FBRywyQkFBMkIsQ0FBQyxLQUFLLENBQUM7S0FDeEMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDN0MsQ0FBQyJ9