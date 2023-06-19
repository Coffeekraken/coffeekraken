import __fs from 'fs';
import __xmlToJson from '../../shared/convert/xmlTojson';
/**
 * @name            readXmlSync
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function allows you to read an xml file and get his content back as JSON
 *
 * @param       {String}           path            The xml file path to read
 * @return      {Object}                            The readed json
 *
 * @snippet         __readXmlSync($1)
 *
 * @example         js
 * import { __readXmlSync } from '@coffeekraken/sugar/fs';
 * __readXmlSync('my-cool-xml/file.xml');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const _cache = {};
export default function __readXmlSync(path) {
    if (_cache[path])
        return _cache[path];
    if (!__fs.existsSync(path)) {
        throw new Error(`<red>[readXmlSync]</red> Sorry but the passed file path "<cyan>${path}</cyan>" does not exists...`);
    }
    const xmlStr = __fs.readFileSync(path, 'utf8').toString();
    const json = __xmlToJson(xmlStr);
    console.log('XML', json);
    _cache[path] = json;
    return json;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLFdBQVcsTUFBTSxnQ0FBZ0MsQ0FBQztBQUV6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDbEIsTUFBTSxDQUFDLE9BQU8sVUFBVSxhQUFhLENBQUMsSUFBWTtJQUM5QyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFBRSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUV0QyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN4QixNQUFNLElBQUksS0FBSyxDQUNYLGtFQUFrRSxJQUFJLDZCQUE2QixDQUN0RyxDQUFDO0tBQ0w7SUFDRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMxRCxNQUFNLElBQUksR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUNwQixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=