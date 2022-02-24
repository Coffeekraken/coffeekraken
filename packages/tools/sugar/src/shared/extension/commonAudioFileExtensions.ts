/**
 * @name            commonAudioFileExtensions
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
 * import __commonAudioFileExtensions from '@coffeekraken/sugar/shared/extension/commonAudioFileExtensions';
 * const extensions = __commonAudioFileExtensions();
 * 
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function commonAudioFileExtensions(withDot = false): string[] {
    return ['aif','cda','mid','midi','mp3','mpa','ogg','wav','wma','wpl'].map(ext => withDot ? `.${ext}` : ext);
}