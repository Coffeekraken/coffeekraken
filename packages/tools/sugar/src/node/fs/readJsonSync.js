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
 * import readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
 * await readJsonSync('my-cool-json/file.json');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const _cache = {};
export default function readJsonSync(path) {
    if (_cache[path])
        return _cache[path];
    if (!__fs.existsSync(path)) {
        throw new Error(`<red>[readJsonSync]</red> Sorry but the passed file path "<cyan>${path}</cyan>" does not exists...`);
    }
    const jsonStr = __fs.readFileSync(path, 'utf8').toString();
    const json = JSON.parse(jsonStr);
    _cache[path] = json;
    return json;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZEpzb25TeW5jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVhZEpzb25TeW5jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUV0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBRUgsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLE1BQU0sQ0FBQyxPQUFPLFVBQVUsWUFBWSxDQUFDLElBQVk7SUFDN0MsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQUUsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FDWCxtRUFBbUUsSUFBSSw2QkFBNkIsQ0FDdkcsQ0FBQztLQUNMO0lBQ0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==