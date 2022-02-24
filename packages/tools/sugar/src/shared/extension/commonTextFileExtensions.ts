import __commonProgrammingFileExtensions from './commonProgrammingFileExtensions';

/**
 * @name            commonTextFileExtensions
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
 * import __commonTextFileExtensions from '@coffeekraken/sugar/shared/extension/commonTextFileExtensions';
 * const extensions = __commonTextFileExtensions();
 * 
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function commonTextFileExtensions(withDot = false): string[] {
    return ['txt','htm','html','md','json','csv','rss','xhtml',...__commonProgrammingFileExtensions(withDot)].map(ext => withDot ? `.${ext}` : ext);
}