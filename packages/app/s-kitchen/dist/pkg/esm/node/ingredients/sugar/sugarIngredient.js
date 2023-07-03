var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __copySync, __dirname, __prependToFileSync, } from '@coffeekraken/sugar/fs';
import { __addDependencies } from '@coffeekraken/sugar/npm';
import { __packageJsonSync } from '@coffeekraken/sugar/package';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __path from 'path';
/**
 * @name        sugarIngredient
 * @namespace   node.ingredients.manifest
 * @type        ISKitchenIngredient
 * @static
 *
 * This ingredient represent the sugar toolkit integration into your project. It will:
 *
 * 1. Install the toolkit
 * 2. Create some base files
 * 3. Add support for "pleasant css syntax"
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const sugarIngredient = {
    id: 'sugar',
    description: 'Add the <yellow>@coffeekraken/sugar</yellow> package to your project',
    projectTypes: ['unknown', 'sugar', 'next'],
    add({ context }) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const rootPath = __packageRootDir(process.cwd()), thisPackageRootPath = __packageRootDir(__dirname());
            // installing the actual package
            (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `<yellow>[sugar]</yellow> Installing the actual <cyan>@coffeekraken/sugar</cyan> and <cyan>@coffeekraken/s-sugar-feature</cyan> packages...`);
            const currentPackageJson = __packageJsonSync(__dirname());
            __addDependencies({
                '@coffeekraken/sugar': `^${currentPackageJson.version}`,
                '@coffeekraken/s-sugar-feature': `^${currentPackageJson.version}`,
            });
            switch (context.projectType.type) {
                case 'next':
                    // creating the file
                    __copySync(__path.resolve(thisPackageRootPath, 'src/data/sugar/sugar.ts'), __path.resolve(rootPath, 'pages/_sugar.ts'));
                    // adding the≤ import in the _app.tsx file
                    __prependToFileSync(`${rootPath}/pages/_app.tsx`, ["import './_sugar';"].join('\n'));
                    break;
                case 'generic':
                default:
                    // creating the file
                    __copySync(__path.resolve(thisPackageRootPath, 'src/data/sugar/sugar.ts'), __path.resolve(__SSugarConfig.get('storage.src.jsDir'), 'sugar.ts'));
                    // adding the≤ import in the _app.tsx file
                    __prependToFileSync(`${__SSugarConfig.get('storage.src.jsDir')}/index.ts`, ["import './sugar';"].join('\n'));
                    break;
            }
            (_b = console.verbose) === null || _b === void 0 ? void 0 : _b.call(console, `<yellow>[sugar]</yellow> Added <green>successfully</green> in your project. Have fun!`);
            return true;
        });
    },
};
export default sugarIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFDSCxVQUFVLEVBQ1YsU0FBUyxFQUNULG1CQUFtQixHQUN0QixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzVELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUcxQjs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILE1BQU0sZUFBZSxHQUF3QjtJQUN6QyxFQUFFLEVBQUUsT0FBTztJQUNYLFdBQVcsRUFDUCxzRUFBc0U7SUFDMUUsWUFBWSxFQUFFLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUM7SUFDcEMsR0FBRyxDQUFDLEVBQUUsT0FBTyxFQUFFOzs7WUFDakIsTUFBTSxRQUFRLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQzVDLG1CQUFtQixHQUFHLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7WUFFeEQsZ0NBQWdDO1lBQ2hDLE1BQUEsT0FBTyxDQUFDLE9BQU8sd0RBQ1gsNElBQTRJLENBQy9JLENBQUM7WUFFRixNQUFNLGtCQUFrQixHQUFHLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7WUFFMUQsaUJBQWlCLENBQUM7Z0JBQ2QscUJBQXFCLEVBQUUsSUFBSSxrQkFBa0IsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3ZELCtCQUErQixFQUFFLElBQUksa0JBQWtCLENBQUMsT0FBTyxFQUFFO2FBQ3BFLENBQUMsQ0FBQztZQUVILFFBQVEsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUU7Z0JBQzlCLEtBQUssTUFBTTtvQkFDUCxvQkFBb0I7b0JBQ3BCLFVBQVUsQ0FDTixNQUFNLENBQUMsT0FBTyxDQUNWLG1CQUFtQixFQUNuQix5QkFBeUIsQ0FDNUIsRUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQyxDQUM5QyxDQUFDO29CQUVGLDBDQUEwQztvQkFDMUMsbUJBQW1CLENBQ2YsR0FBRyxRQUFRLGlCQUFpQixFQUM1QixDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNwQyxDQUFDO29CQUNGLE1BQU07Z0JBQ1YsS0FBSyxTQUFTLENBQUM7Z0JBQ2Y7b0JBQ0ksb0JBQW9CO29CQUNwQixVQUFVLENBQ04sTUFBTSxDQUFDLE9BQU8sQ0FDVixtQkFBbUIsRUFDbkIseUJBQXlCLENBQzVCLEVBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FDVixjQUFjLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLEVBQ3ZDLFVBQVUsQ0FDYixDQUNKLENBQUM7b0JBRUYsMENBQTBDO29CQUMxQyxtQkFBbUIsQ0FDZixHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUNyRCxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNuQyxDQUFDO29CQUVGLE1BQU07YUFDYjtZQUVELE1BQUEsT0FBTyxDQUFDLE9BQU8sd0RBQ1gsdUZBQXVGLENBQzFGLENBQUM7WUFFRixPQUFPLElBQUksQ0FBQzs7S0FDZjtDQUNKLENBQUM7QUFDRixlQUFlLGVBQWUsQ0FBQyJ9