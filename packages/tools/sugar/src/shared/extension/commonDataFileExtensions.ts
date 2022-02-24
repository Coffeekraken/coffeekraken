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
 * @param       {Boolean}           withDot          If true, the dot will be added to the extension
 * @return     {Array<String>}                           The array of extensions    
 * 
 * @example         js
 * import __commonDataFileExtensions from '@coffeekraken/sugar/shared/extension/commonDataFileExtensions';
 * const extensions = __commonDataFileExtensions();
 * 
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function commonDataFileExtensions(withDot = false): string[] {
    return ['csv','dat','db','dbf','json','log','mdb','sav','sql','tar','xml'].map(ext => withDot ? `.${ext}` : ext);
}