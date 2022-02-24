/**
 * @name            commonWebFileExtensions
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
 * import __commonWebFileExtensions from '@coffeekraken/sugar/shared/extension/commonWebFileExtensions';
 * const extensions = __commonWebFileExtensions();
 * 
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function commonWebFileExtensions(withDot = false): string[] {
    return ['asp','cer','cfm','cgi','pl','css','htm','html','js','jsp','part','php','py','rss','xhtml'].map(ext => withDot ? `.${ext}` : ext);
}