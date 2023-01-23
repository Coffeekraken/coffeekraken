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
import __npmInstall from '@coffeekraken/sugar/node/npm/install';
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
        return __awaiter(this, void 0, void 0, function* () {
            const rootPath = __packageRootDir(process.cwd()), thisPackageRootPath = __packageRootDir(__dirname());
            // installing the actual package
            console.log(`<yellow>[sugar]</yellow> Installing the actual <cyan>@coffeekraken/sugar</cyan> and <cyan>@coffeekraken/s-sugar-feature</cyan> packages...`);
            try {
                yield __npmInstall([
                    '@coffeekraken/sugar',
                    '@coffeekraken/s-sugar-feature',
                ]);
            }
            catch (e) {
                console.error(`<red>sugar</red> Something went wrong when installing the @coffeekraken packages. Please try to install it manually.`);
            }
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
            console.log(`<yellow>[sugar]</yellow> Added <green>successfully</green> in your project. Have fun!`);
            return true;
        });
    },
};
export default sugarIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFDSCxVQUFVLEVBQ1YsU0FBUyxFQUNULG1CQUFtQixHQUN0QixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sWUFBWSxNQUFNLHNDQUFzQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUcxQjs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILE1BQU0sZUFBZSxHQUF3QjtJQUN6QyxFQUFFLEVBQUUsT0FBTztJQUNYLFdBQVcsRUFDUCxzRUFBc0U7SUFDMUUsWUFBWSxFQUFFLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUM7SUFDcEMsR0FBRyxDQUFDLEVBQUUsT0FBTyxFQUFFOztZQUNqQixNQUFNLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsRUFDNUMsbUJBQW1CLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztZQUV4RCxnQ0FBZ0M7WUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FDUCw0SUFBNEksQ0FDL0ksQ0FBQztZQUNGLElBQUk7Z0JBQ0EsTUFBTSxZQUFZLENBQUM7b0JBQ2YscUJBQXFCO29CQUNyQiwrQkFBK0I7aUJBQ2xDLENBQUMsQ0FBQzthQUNOO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1IsT0FBTyxDQUFDLEtBQUssQ0FDVCxzSEFBc0gsQ0FDekgsQ0FBQzthQUNMO1lBRUQsUUFBUSxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTtnQkFDOUIsS0FBSyxNQUFNO29CQUNQLG9CQUFvQjtvQkFDcEIsVUFBVSxDQUNOLE1BQU0sQ0FBQyxPQUFPLENBQ1YsbUJBQW1CLEVBQ25CLHlCQUF5QixDQUM1QixFQUNELE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLGlCQUFpQixDQUFDLENBQzlDLENBQUM7b0JBRUYsMENBQTBDO29CQUMxQyxtQkFBbUIsQ0FDZixHQUFHLFFBQVEsaUJBQWlCLEVBQzVCLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ3BDLENBQUM7b0JBQ0YsTUFBTTtnQkFDVixLQUFLLFNBQVMsQ0FBQztnQkFDZjtvQkFDSSxvQkFBb0I7b0JBQ3BCLFVBQVUsQ0FDTixNQUFNLENBQUMsT0FBTyxDQUNWLG1CQUFtQixFQUNuQix5QkFBeUIsQ0FDNUIsRUFDRCxNQUFNLENBQUMsT0FBTyxDQUNWLGNBQWMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsRUFDdkMsVUFBVSxDQUNiLENBQ0osQ0FBQztvQkFFRiwwQ0FBMEM7b0JBQzFDLG1CQUFtQixDQUNmLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQ3JELENBQUMsbUJBQW1CLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ25DLENBQUM7b0JBRUYsTUFBTTthQUNiO1lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FDUCx1RkFBdUYsQ0FDMUYsQ0FBQztZQUVGLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtDQUNKLENBQUM7QUFDRixlQUFlLGVBQWUsQ0FBQyJ9