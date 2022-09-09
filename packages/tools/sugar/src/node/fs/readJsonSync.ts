import __fs from 'fs';

/**
 * @name            readJsonSync
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @status          beta
 *
 * This function allows you to read a json file
 *
 * @param       {String}           path            The json file path to read
 * @return      {Object}                            The readed json
 *
 * @example         js
 * import { __readJsonSync } from '@coffeekraken/sugar/fs';
 * __readJsonSync('my-cool-json/file.json');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

const _cache = {};
export default function __readJsonSync(path: string): any {
    if (_cache[path]) return _cache[path];

    if (!__fs.existsSync(path)) {
        throw new Error(
            `<red>[readJsonSync]</red> Sorry but the passed file path "<cyan>${path}</cyan>" does not exists...`,
        );
    }
    const jsonStr = __fs.readFileSync(path, 'utf8').toString();
    const json = JSON.parse(jsonStr);
    _cache[path] = json;
    return json;
}
