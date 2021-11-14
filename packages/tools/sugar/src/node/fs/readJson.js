var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __fs from 'fs';
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function readJson(path) {
    if (!__fs.existsSync(path)) {
        throw new Error(`<red>[readJson]</red> Sorry but the passed file path "<cyan>${path}</cyan>" does not exists...`);
    }
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        // const cachedValue = await __ipcCache(`readJson-${path}`);
        // if (cachedValue) {
        //     console.log('From cache', path);
        //    return resolve(cachedValue);
        // }
        const json = (yield import(path)).default;
        resolve(json);
        // __ipcCache(`readJson-${path}`, json);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZEpzb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWFkSnNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFFdEI7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsUUFBUSxDQUFDLElBQVk7SUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDeEIsTUFBTSxJQUFJLEtBQUssQ0FDWCwrREFBK0QsSUFBSSw2QkFBNkIsQ0FDbkcsQ0FBQztLQUNMO0lBQ0QsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUN6Qyw0REFBNEQ7UUFDNUQscUJBQXFCO1FBQ3JCLHVDQUF1QztRQUN2QyxrQ0FBa0M7UUFDbEMsSUFBSTtRQUVKLE1BQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDMUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2Qsd0NBQXdDO0lBQzVDLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDUCxDQUFDIn0=