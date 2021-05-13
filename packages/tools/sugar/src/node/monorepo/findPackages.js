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
/**
 * @name            findPackages
 * @namespace            node.monorepo
 * @type            Function
 * @async
 * @status              beta
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
            packagesObj[folder] = require(`${rootDir}/${path}`);
        });
        return packagesObj;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZFBhY2thZ2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmluZFBhY2thZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLEtBQUssTUFBTSxNQUFNLENBQUM7QUFFekI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQWdCLFlBQVksQ0FDeEMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUU7O1FBS3ZCLE1BQU0sV0FBVyxHQUFpQixFQUFFLENBQUM7UUFDckMsTUFBTSxhQUFhLEdBQUcsS0FBSzthQUN4QixJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDdkIsR0FBRyxFQUFFLE9BQU87WUFDWixNQUFNLEVBQUUsb0JBQW9CO1NBQzdCLENBQUM7YUFDRCxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksS0FBSyxjQUFjLENBQUMsQ0FBQztRQUM3QyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDN0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RELFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxPQUFPLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztRQUN0RCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7Q0FBQSJ9