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

/**
 * @name            commonFileExtensions
 * @namespace       shared.extension
 * @type            Function
 * @platform       node
 * @platform        js
 * @status         beta
 * 
 * This function allows you to get an array of common file extensions with or without the dot.
 * You can filter extensions by types:
 * - audio
 * - compressed
 * - data
 * - disc
 * - email
 * - executable
 * - font
 * - image
 * - media
 * - programming
 * - text
 * - video
 * - web
 * 
 * @param       {Boolean}           withDot          If true, the dot will be added to the extension
 * @return     {Array<String>}                           The array of extensions    
 * 
 * @example         js
 * import __commonFileExtensions from '@coffeekraken/sugar/shared/extension/commonFileExtensions';
 * const extensions = __commonFileExtensions(); // => ['avi','mp3',...]
 * 
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export type Types = ('audio' | 'compressed' | 'data' | 'disc' | 'email' | 'executable' | 'font' | 'image' | 'media' | 'programming' | 'text' | 'video' | 'web')[];

export default function commonFileExtensions(types: Types = ['audio','compressed','data','disc','email','executable','font','image','media','programming','text','video','web'], withDot = false): string[] {
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