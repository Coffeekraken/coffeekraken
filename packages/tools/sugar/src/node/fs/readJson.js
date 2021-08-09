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
 * @platform        ts
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
const _cache = {};
export default function readJson(path) {
    if (_cache[path])
        return _cache[path];
    if (!__fs.existsSync(path)) {
        throw new Error(`<red>[readJson]</red> Sorry but the passed file path "<cyan>${path}</cyan>" does not exists...`);
    }
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const json = (yield import(path)).default;
        _cache[path] = json;
        resolve(json);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZEpzb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWFkSnNvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFFdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFDSCxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDbEIsTUFBTSxDQUFDLE9BQU8sVUFBVSxRQUFRLENBQUMsSUFBWTtJQUV6QyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFBRSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUV0QyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLCtEQUErRCxJQUFJLDZCQUE2QixDQUFDLENBQUM7S0FDckg7SUFDRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3pDLE1BQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNwQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNQLENBQUMifQ==