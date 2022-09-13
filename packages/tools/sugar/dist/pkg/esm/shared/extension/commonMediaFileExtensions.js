import __commonAudioFileExtensions from './commonAudioFileExtensions';
import __commonImageFileExtensions from './commonImageFileExtensions';
import __commonVideoFileExtensions from './commonVideoFileExtensions';
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
 * @param       {Boolean}           withDot          If true, the dot will be added to the extension
 * @return     {Array<String>}                           The array of extensions
 *
 * @example         js
 * import { __commonMediaFileExtensions } from '@coffeekraken/sugar/extension';
 * const extensions = __commonMediaFileExtensions(); // => ['avi','mp3',...]
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __commonMediaFileExtensions(settings = {}) {
    const finalSettings = Object.assign({ dot: false, exclude: [] }, settings);
    return __unique([
        ...__commonImageFileExtensions(finalSettings),
        ...__commonVideoFileExtensions(finalSettings),
        ...__commonAudioFileExtensions(finalSettings),
    ])
        .filter((ext) => !finalSettings.exclude.includes(ext))
        .map((ext) => (finalSettings.dot ? `.${ext}` : ext));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sMkJBQTJCLE1BQU0sNkJBQTZCLENBQUM7QUFDdEUsT0FBTywyQkFBMkIsTUFBTSw2QkFBNkIsQ0FBQztBQUN0RSxPQUFPLDJCQUEyQixNQUFNLDZCQUE2QixDQUFDO0FBRXRFLE9BQU8sUUFBUSxNQUFNLGlCQUFpQixDQUFDO0FBRXZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSwyQkFBMkIsQ0FDL0MsV0FBbUQsRUFBRTtJQUVyRCxNQUFNLGFBQWEsbUJBQ2YsR0FBRyxFQUFFLEtBQUssRUFDVixPQUFPLEVBQUUsRUFBRSxJQUNSLFFBQVEsQ0FDZCxDQUFDO0lBQ0YsT0FBTyxRQUFRLENBQUM7UUFDWixHQUFHLDJCQUEyQixDQUFDLGFBQWEsQ0FBQztRQUM3QyxHQUFHLDJCQUEyQixDQUFDLGFBQWEsQ0FBQztRQUM3QyxHQUFHLDJCQUEyQixDQUFDLGFBQWEsQ0FBQztLQUNoRCxDQUFDO1NBQ0csTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3JELEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzdELENBQUMifQ==