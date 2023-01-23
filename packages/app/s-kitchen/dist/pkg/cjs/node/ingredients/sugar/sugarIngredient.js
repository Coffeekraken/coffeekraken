"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const fs_1 = require("@coffeekraken/sugar/fs");
const install_1 = __importDefault(require("@coffeekraken/sugar/node/npm/install"));
const path_1 = require("@coffeekraken/sugar/path");
const path_2 = __importDefault(require("path"));
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
            const rootPath = (0, path_1.__packageRootDir)(process.cwd()), thisPackageRootPath = (0, path_1.__packageRootDir)((0, fs_1.__dirname)());
            // installing the actual package
            console.log(`<yellow>[sugar]</yellow> Installing the actual <cyan>@coffeekraken/sugar</cyan> and <cyan>@coffeekraken/s-sugar-feature</cyan> packages...`);
            try {
                yield (0, install_1.default)([
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
                    (0, fs_1.__copySync)(path_2.default.resolve(thisPackageRootPath, 'src/data/sugar/sugar.ts'), path_2.default.resolve(rootPath, 'pages/_sugar.ts'));
                    // adding the≤ import in the _app.tsx file
                    (0, fs_1.__prependToFileSync)(`${rootPath}/pages/_app.tsx`, ["import './_sugar';"].join('\n'));
                    break;
                case 'generic':
                default:
                    // creating the file
                    (0, fs_1.__copySync)(path_2.default.resolve(thisPackageRootPath, 'src/data/sugar/sugar.ts'), path_2.default.resolve(s_sugar_config_1.default.get('storage.src.jsDir'), 'sugar.ts'));
                    // adding the≤ import in the _app.tsx file
                    (0, fs_1.__prependToFileSync)(`${s_sugar_config_1.default.get('storage.src.jsDir')}/index.ts`, ["import './sugar';"].join('\n'));
                    break;
            }
            console.log(`<yellow>[sugar]</yellow> Added <green>successfully</green> in your project. Have fun!`);
            return true;
        });
    },
};
exports.default = sugarIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0ZBQTBEO0FBQzFELCtDQUlnQztBQUNoQyxtRkFBZ0U7QUFDaEUsbURBQTREO0FBQzVELGdEQUEwQjtBQUcxQjs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILE1BQU0sZUFBZSxHQUF3QjtJQUN6QyxFQUFFLEVBQUUsT0FBTztJQUNYLFdBQVcsRUFDUCxzRUFBc0U7SUFDMUUsWUFBWSxFQUFFLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUM7SUFDcEMsR0FBRyxDQUFDLEVBQUUsT0FBTyxFQUFFOztZQUNqQixNQUFNLFFBQVEsR0FBRyxJQUFBLHVCQUFnQixFQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUM1QyxtQkFBbUIsR0FBRyxJQUFBLHVCQUFnQixFQUFDLElBQUEsY0FBUyxHQUFFLENBQUMsQ0FBQztZQUV4RCxnQ0FBZ0M7WUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FDUCw0SUFBNEksQ0FDL0ksQ0FBQztZQUNGLElBQUk7Z0JBQ0EsTUFBTSxJQUFBLGlCQUFZLEVBQUM7b0JBQ2YscUJBQXFCO29CQUNyQiwrQkFBK0I7aUJBQ2xDLENBQUMsQ0FBQzthQUNOO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1IsT0FBTyxDQUFDLEtBQUssQ0FDVCxzSEFBc0gsQ0FDekgsQ0FBQzthQUNMO1lBRUQsUUFBUSxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTtnQkFDOUIsS0FBSyxNQUFNO29CQUNQLG9CQUFvQjtvQkFDcEIsSUFBQSxlQUFVLEVBQ04sY0FBTSxDQUFDLE9BQU8sQ0FDVixtQkFBbUIsRUFDbkIseUJBQXlCLENBQzVCLEVBQ0QsY0FBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLENBQUMsQ0FDOUMsQ0FBQztvQkFFRiwwQ0FBMEM7b0JBQzFDLElBQUEsd0JBQW1CLEVBQ2YsR0FBRyxRQUFRLGlCQUFpQixFQUM1QixDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNwQyxDQUFDO29CQUNGLE1BQU07Z0JBQ1YsS0FBSyxTQUFTLENBQUM7Z0JBQ2Y7b0JBQ0ksb0JBQW9CO29CQUNwQixJQUFBLGVBQVUsRUFDTixjQUFNLENBQUMsT0FBTyxDQUNWLG1CQUFtQixFQUNuQix5QkFBeUIsQ0FDNUIsRUFDRCxjQUFNLENBQUMsT0FBTyxDQUNWLHdCQUFjLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLEVBQ3ZDLFVBQVUsQ0FDYixDQUNKLENBQUM7b0JBRUYsMENBQTBDO29CQUMxQyxJQUFBLHdCQUFtQixFQUNmLEdBQUcsd0JBQWMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUNyRCxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNuQyxDQUFDO29CQUVGLE1BQU07YUFDYjtZQUVELE9BQU8sQ0FBQyxHQUFHLENBQ1AsdUZBQXVGLENBQzFGLENBQUM7WUFFRixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0tBQUE7Q0FDSixDQUFDO0FBQ0Ysa0JBQWUsZUFBZSxDQUFDIn0=