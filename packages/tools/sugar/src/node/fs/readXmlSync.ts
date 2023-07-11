import __fs from 'fs';
import __xmlToJson from '../../shared/convert/xmlTojson.js';

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
export default function __readXmlSync(path: string): any {
    if (_cache[path]) return _cache[path];

    if (!__fs.existsSync(path)) {
        throw new Error(
            `<red>[readXmlSync]</red> Sorry but the passed file path "<cyan>${path}</cyan>" does not exists...`,
        );
    }
    const xmlStr = __fs.readFileSync(path, 'utf8').toString();
    const json = __xmlToJson(xmlStr);
    console.log('XML', json);
    _cache[path] = json;
    return json;
}
