import __fs from 'fs';
/**
 * @name            readJsonSync
 * @namespace       node.fs
 * @type            Function
 * @platform        node
 * @platform        ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZEpzb25TeW5jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVhZEpzb25TeW5jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUV0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNsQixNQUFNLENBQUMsT0FBTyxVQUFVLFlBQVksQ0FBQyxJQUFZO0lBRTdDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQztRQUFFLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXRDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsbUVBQW1FLElBQUksNkJBQTZCLENBQUMsQ0FBQztLQUN6SDtJQUNELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUNwQixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=