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
 * @snippet         __commonFileExtensions()
 *
 * @example         js
 * import { __commonFileExtensions } from '@coffeekraken/sugar/extension';
 * const extensions = __commonFileExtensions(); // => ['avi','mp3',...]
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export type Types = (
    | 'audio'
    | 'compressed'
    | 'data'
    | 'disc'
    | 'email'
    | 'executable'
    | 'font'
    | 'image'
    | 'media'
    | 'programming'
    | 'text'
    | 'video'
    | 'web'
)[];

export interface ICommonFileExtensionsSettings {
    dot: boolean;
    exclude: string[];
}

export default function __commonFileExtensions(
    types: Types = [
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
    ],
    settings: Partial<ICommonFileExtensionsSettings> = {},
): string[] {
    const finalSettings: ICommonFileExtensionsSettings = {
        dot: false,
        exclude: [],
        ...settings,
    };

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
