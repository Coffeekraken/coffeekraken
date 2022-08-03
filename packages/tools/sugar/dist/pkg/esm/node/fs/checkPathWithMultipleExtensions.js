import __extension from './extension';
import __fs from 'fs';
/**
 * @name            checkPathWithMultipleExtensions
 * @namespace            node.fs
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function take a path and some extensions to check if a file
 * exists with one of these particular extensions.
 * If a file exists, the function return the path with the first extensions that matches
 *
 * @todo        tests
 *
 * @param       {String}            path            The file path you want to check. With or without an extension
 * @param       {Array<String>}     extensions      The extensions (without the dot) you want to check
 * @return      {String|undefined}                  The first valid path founded, or undefined
 *
 * @example         js
 * import checkPathWithMultipleExtensions from '@coffeekraken/sugar/node/fs/checkPathWithMultipleExtensions';
 * checkPathWithMultipleExtensions('/my/cool/file.txt', ['txt','js','css']);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function checkPathWithMultipleExtensions(path, exts) {
    const extension = __extension(path) || '';
    const pathWithoutExt = path.replace(`.${extension}`, '');
    for (let i = 0; i < exts.length; i++) {
        const ext = exts[i];
        if (__fs.existsSync(`${pathWithoutExt}.${ext}`)) {
            return `${pathWithoutExt}.${ext}`;
        }
    }
    return undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLGFBQWEsQ0FBQztBQUN0QyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFHdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSwrQkFBK0IsQ0FDbkQsSUFBWSxFQUNaLElBQWM7SUFFZCxNQUFNLFNBQVMsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBRTFDLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxTQUFTLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN6RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNsQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsY0FBYyxJQUFJLEdBQUcsRUFBRSxDQUFDLEVBQUU7WUFDN0MsT0FBTyxHQUFHLGNBQWMsSUFBSSxHQUFHLEVBQUUsQ0FBQztTQUNyQztLQUNKO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQyJ9