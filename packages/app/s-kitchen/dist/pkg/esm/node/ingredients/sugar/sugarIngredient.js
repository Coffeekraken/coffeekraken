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
import __copySync from '@coffeekraken/sugar/node/fs/copySync';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __prependToFileSync from '@coffeekraken/sugar/node/fs/prependToFileSync';
import __npmInstall from '@coffeekraken/sugar/node/npm/install';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
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
    add({ ask, log, emit, pipe, context }) {
        return __awaiter(this, void 0, void 0, function* () {
            const rootPath = __packageRoot(process.cwd()), thisPackageRootPath = __packageRoot(__dirname());
            // installing the actual package
            emit('log', {
                value: `<yellow>[sugar]</yellow> Installing the actual <cyan>@coffeekraken/sugar</cyan> and <cyan>@coffeekraken/s-sugar-feature</cyan> packages...`,
            });
            try {
                yield pipe(__npmInstall([
                    '@coffeekraken/sugar',
                    '@coffeekraken/s-sugar-feature',
                ]));
            }
            catch (e) {
                emit('log', {
                    value: `<red>sugar</red> Something went wrong when installing the @coffeekraken packages. Please try to install it manually.`,
                });
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
            emit('log', {
                value: `<yellow>[sugar]</yellow> Added <green>successfully</green> in your project. Have fun!`,
            });
            return true;
        });
    },
};
export default sugarIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sVUFBVSxNQUFNLHNDQUFzQyxDQUFDO0FBQzlELE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sbUJBQW1CLE1BQU0sK0NBQStDLENBQUM7QUFDaEYsT0FBTyxZQUFZLE1BQU0sc0NBQXNDLENBQUM7QUFDaEUsT0FBTyxhQUFhLE1BQU0sMkNBQTJDLENBQUM7QUFDdEUsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBRzFCOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBQ0gsTUFBTSxlQUFlLEdBQXdCO0lBQ3pDLEVBQUUsRUFBRSxPQUFPO0lBQ1gsV0FBVyxFQUNQLHNFQUFzRTtJQUMxRSxZQUFZLEVBQUUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQztJQUNwQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFOztZQUN2QyxNQUFNLFFBQVEsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQ3pDLG1CQUFtQixHQUFHLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBRXJELGdDQUFnQztZQUNoQyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLEtBQUssRUFBRSw0SUFBNEk7YUFDdEosQ0FBQyxDQUFDO1lBQ0gsSUFBSTtnQkFDQSxNQUFNLElBQUksQ0FDTixZQUFZLENBQUM7b0JBQ1QscUJBQXFCO29CQUNyQiwrQkFBK0I7aUJBQ2xDLENBQUMsQ0FDTCxDQUFDO2FBQ0w7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDUixJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLEtBQUssRUFBRSxzSEFBc0g7aUJBQ2hJLENBQUMsQ0FBQzthQUNOO1lBRUQsUUFBUSxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTtnQkFDOUIsS0FBSyxNQUFNO29CQUNQLG9CQUFvQjtvQkFDcEIsVUFBVSxDQUNOLE1BQU0sQ0FBQyxPQUFPLENBQ1YsbUJBQW1CLEVBQ25CLHlCQUF5QixDQUM1QixFQUNELE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLGlCQUFpQixDQUFDLENBQzlDLENBQUM7b0JBRUYsMENBQTBDO29CQUMxQyxtQkFBbUIsQ0FDZixHQUFHLFFBQVEsaUJBQWlCLEVBQzVCLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ3BDLENBQUM7b0JBQ0YsTUFBTTtnQkFDVixLQUFLLFNBQVMsQ0FBQztnQkFDZjtvQkFDSSxvQkFBb0I7b0JBQ3BCLFVBQVUsQ0FDTixNQUFNLENBQUMsT0FBTyxDQUNWLG1CQUFtQixFQUNuQix5QkFBeUIsQ0FDNUIsRUFDRCxNQUFNLENBQUMsT0FBTyxDQUNWLGNBQWMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsRUFDdkMsVUFBVSxDQUNiLENBQ0osQ0FBQztvQkFFRiwwQ0FBMEM7b0JBQzFDLG1CQUFtQixDQUNmLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQ3JELENBQUMsbUJBQW1CLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ25DLENBQUM7b0JBRUYsTUFBTTthQUNiO1lBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEVBQUUsdUZBQXVGO2FBQ2pHLENBQUMsQ0FBQztZQUVILE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtDQUNKLENBQUM7QUFDRixlQUFlLGVBQWUsQ0FBQyJ9