/**
 * @name            commonProgrammingFileExtensions
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
 * import __commonProgrammingFileExtensions from '@coffeekraken/sugar/shared/extension/commonProgrammingFileExtensions';
 * const extensions = __commonProgrammingFileExtensions();
 * 
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function commonProgrammingFileExtensions(withDot = false): string[] {
    return ['asp','c','cgi','cfm','pl','class','cpp','cs','h','java','php','py','sh','swift','vb','js','jsp','jsx','css','ts','tsx','rs','dart'].map(ext => withDot ? `.${ext}` : ext);
}