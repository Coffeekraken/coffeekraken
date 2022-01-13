/**
 * @name            commonEmailFileExtensions
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
 * import __commonEmailFileExtensions from '@coffeekraken/sugar/shared/extension/commonEmailFileExtensions';
 * const extensions = __commonEmailFileExtensions();
 * 
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function commonEmailFileExtensions(withDot = false): string[] {
    return ['email','eml','emix','msg','oft','ost','pst','vcf'].map(ext => withDot ? `.${ext}` : ext);
}