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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function commonProgrammingFileExtensions(withDot = false): string[] {
    return ['3g2','3gp','avi','flv','h264','m4v','mkv','mov','mp4','mpg','mpeg','rm','swf','vob','wmv'].map(ext => withDot ? `.${ext}` : ext);
}