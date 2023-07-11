import { ICommonFileExtensionsSettings } from './commonFileExtensions.js';

/**
 * @name            commonDataFileExtensions
 * @namespace       shared.extension
 * @type            Function
 * @platform       node
 * @platform        js
 * @status         beta
 *
 * This function allows you to get an array of common text file extensions with or without the dot
 *
 * @param       {Boolean}           withDot          If true, the dot will be added to the extension
 * @return     {Array<String>}                           The array of extensions
 *
 * @snippet         __commonDataFileExtensions()
 *
 * @example         js
 * import { __commonDataFileExtensions } from '@coffeekraken/sugar/extension';
 * const extensions = __commonDataFileExtensions();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __commonDataFileExtensions(
    settings: Partial<ICommonFileExtensionsSettings> = {},
): string[] {
    const finalSettings: ICommonFileExtensionsSettings = {
        dot: false,
        exclude: [],
        ...settings,
    };
    return [
        'csv',
        'dat',
        'db',
        'dbf',
        'json',
        'log',
        'mdb',
        'sav',
        'sql',
        'tar',
        'xml',
    ]
        .filter((ext) => !finalSettings.exclude.includes(ext))
        .map((ext) => (finalSettings.dot ? `.${ext}` : ext));
}
