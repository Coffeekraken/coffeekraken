/**
 * @name            commonDiscFileExtensions
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
 * import __commonDiscFileExtensions from '@coffeekraken/sugar/shared/extension/commonDiscFileExtensions';
 * const extensions = __commonDiscFileExtensions();
 * 
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function commonDiscFileExtensions(withDot = false): string[] {
    return ['bin','dmg','iso','toast','vcd'].map(ext => withDot ? `.${ext}` : ext);
}