/**
 * @name            commonImageFileExtensions
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
 * import __commonImageFileExtensions from '@coffeekraken/sugar/shared/extension/commonImageFileExtensions';
 * const extensions = __commonImageFileExtensions();
 * 
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function commonImageFileExtensions(withDot = false): string[] {
    return ['ai','bmp','gif','ico','jpeg','jpg','png','ps','psd','svg','tif','tiff','webp'].map(ext => withDot ? `.${ext}` : ext);
}