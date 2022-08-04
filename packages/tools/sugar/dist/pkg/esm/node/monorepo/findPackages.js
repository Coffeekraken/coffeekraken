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
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
import _glob from 'glob';
/**
 * @name            findPackages
 * @namespace            node.monorepo
 * @type            Function
 * @async
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function findPackages(rootDir = process.cwd()) {
    return __awaiter(this, void 0, void 0, function* () {
        const packagesObj = {};
        const packagesPaths = _glob
            .sync('**/package.json', {
            cwd: rootDir,
            ignore: '**/node_modules/**',
        })
            .filter((path) => path !== 'package.json');
        packagesPaths.forEach((path) => {
            const folder = path.split('/').slice(0, -1).join('/');
            packagesObj[folder] = __readJsonSync(`${rootDir}/${path}`);
        });
        return packagesObj;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGNBQWMsTUFBTSwwQ0FBMEMsQ0FBQztBQUN0RSxPQUFPLEtBQUssTUFBTSxNQUFNLENBQUM7QUFFekI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFnQixZQUFZLENBQ3RDLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFOztRQUt2QixNQUFNLFdBQVcsR0FBaUIsRUFBRSxDQUFDO1FBQ3JDLE1BQU0sYUFBYSxHQUFHLEtBQUs7YUFDdEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3JCLEdBQUcsRUFBRSxPQUFPO1lBQ1osTUFBTSxFQUFFLG9CQUFvQjtTQUMvQixDQUFDO2FBQ0QsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEtBQUssY0FBYyxDQUFDLENBQUM7UUFDL0MsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzNCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0RCxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsY0FBYyxDQUFDLEdBQUcsT0FBTyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7UUFDL0QsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLFdBQVcsQ0FBQztJQUN2QixDQUFDO0NBQUEifQ==