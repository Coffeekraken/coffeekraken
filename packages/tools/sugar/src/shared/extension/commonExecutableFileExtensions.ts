import { ICommonFileExtensionsSettings } from './commonFileExtensions';

/**
 * @name            commonExecutableFileExtensions
 * @namespace       shared.extension
 * @type            Function
 * @platform       node
 * @platform        js
 * @status         beta
 *
 * This function allows you to get an array of common text file extensions with or without the dot
 *
 * @param       {Boolean}           withDot          If true, the dot will be added to the extension
 * @return     {Array<String>}                           The array of extensions
 *
 * @example         js
 * import __commonExecutableFileExtensions from '@coffeekraken/sugar/shared/extension/commonExecutableFileExtensions';
 * const extensions = __commonExecutableFileExtensions();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function commonExecutableFileExtensions(
    settings: Partial<ICommonFileExtensionsSettings> = {},
): string[] {
    const finalSettings: ICommonFileExtensionsSettings = {
        dot: false,
        exclude: [],
        ...settings,
    };
    return [
        'apk',
        'bat',
        'bin',
        'cgi',
        'pi',
        'com',
        'exe',
        'gadget',
        'jsr',
        'msi',
        'py',
        'wsf',
    ]
        .filter((ext) => !finalSettings.exclude.includes(ext))
        .map((ext) => (finalSettings.dot ? `.${ext}` : ext));
}
