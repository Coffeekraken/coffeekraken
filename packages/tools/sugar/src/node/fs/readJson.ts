import __fs from 'fs';
import __readJsonSync from './readJsonSync';

/**
 * @name            readJson
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
 * import readJson from '@coffeekraken/sugar/node/fs/readJson';
 * await readJson('my-cool-json/file.json');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function readJson(path: string): any {
    if (!__fs.existsSync(path)) {
        throw new Error(
            `<red>[readJson]</red> Sorry but the passed file path "<cyan>${path}</cyan>" does not exists...`,
        );
    }
    return new Promise(async (resolve, reject) => {
        const json = __readJsonSync(path);
        resolve(json);
    });
}
