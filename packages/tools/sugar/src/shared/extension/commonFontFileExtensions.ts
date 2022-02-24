/**
 * @name            commonFontFileExtensions
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
 * import __commonFontFileExtensions from '@coffeekraken/sugar/shared/extension/commonFontFileExtensions';
 * const extensions = __commonFontFileExtensions();
 * 
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function commonFontFileExtensions(withDot = false): string[] {
    return ['fnt','fon','otf','ttf','woff','woff2'].map(ext => withDot ? `.${ext}` : ext);
}