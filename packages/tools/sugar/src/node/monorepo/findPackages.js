// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import _glob from 'glob';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
/**
 * @name            findPackages
 * @namespace            node.monorepo
 * @type            Function
 * @async
 * @platform        ts
 * @platform        node
 * @status          beta
 *
 * This function simply let you search for packages (that are not dependencies) inside
 * the passed folder and returns a object with relative paths as keys and package.json
 * content value
 *
 * @param         {String}          [rootDir=process.cwd()]       The root directory from where to search for packages
 * @return        {Promise}                                       A promise that will be resolved once the process is finished with the resulting object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import findPackages from '@coffeekraken/sugar/node/monorepo/findPackages';
 * const packages = await findPackages();
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function findPackages(rootDir = process.cwd()) {
    return __awaiter(this, void 0, void 0, function* () {
        const packagesObj = {};
        const packagesPaths = _glob
            .sync('**/package.json', {
            cwd: rootDir,
            ignore: '**/node_modules/**'
        })
            .filter((path) => path !== 'package.json');
        packagesPaths.forEach((path) => {
            const folder = path.split('/').slice(0, -1).join('/');
            packagesObj[folder] = __readJsonSync(`${rootDir}/${path}`);
        });
        return packagesObj;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZFBhY2thZ2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmluZFBhY2thZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLEtBQUssTUFBTSxNQUFNLENBQUM7QUFDekIsT0FBTyxjQUFjLE1BQU0sMENBQTBDLENBQUM7QUFFdEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBZ0IsWUFBWSxDQUN4QyxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRTs7UUFLdkIsTUFBTSxXQUFXLEdBQWlCLEVBQUUsQ0FBQztRQUNyQyxNQUFNLGFBQWEsR0FBRyxLQUFLO2FBQ3hCLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUN2QixHQUFHLEVBQUUsT0FBTztZQUNaLE1BQU0sRUFBRSxvQkFBb0I7U0FDN0IsQ0FBQzthQUNELE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxLQUFLLGNBQWMsQ0FBQyxDQUFDO1FBQzdDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM3QixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEQsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLGNBQWMsQ0FBQyxHQUFHLE9BQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzdELENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQztDQUFBIn0=