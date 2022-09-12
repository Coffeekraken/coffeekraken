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
    add({ ask, log, emit, pipe, context }) {
        return __awaiter(this, void 0, void 0, function* () {
            const rootPath = (0, path_1.__packageRootDir)(process.cwd()), thisPackageRootPath = (0, path_1.__packageRootDir)((0, fs_1.__dirname)());
            // installing the actual package
            emit('log', {
                value: `<yellow>[sugar]</yellow> Installing the actual <cyan>@coffeekraken/sugar</cyan> and <cyan>@coffeekraken/s-sugar-feature</cyan> packages...`,
            });
            try {
                yield pipe((0, install_1.default)([
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
            emit('log', {
                value: `<yellow>[sugar]</yellow> Added <green>successfully</green> in your project. Have fun!`,
            });
            return true;
        });
    },
};
exports.default = sugarIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0ZBQTBEO0FBQzFELCtDQUlnQztBQUNoQyxtRkFBZ0U7QUFDaEUsbURBQTREO0FBQzVELGdEQUEwQjtBQUcxQjs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILE1BQU0sZUFBZSxHQUF3QjtJQUN6QyxFQUFFLEVBQUUsT0FBTztJQUNYLFdBQVcsRUFDUCxzRUFBc0U7SUFDMUUsWUFBWSxFQUFFLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUM7SUFDcEMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTs7WUFDdkMsTUFBTSxRQUFRLEdBQUcsSUFBQSx1QkFBZ0IsRUFBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsRUFDNUMsbUJBQW1CLEdBQUcsSUFBQSx1QkFBZ0IsRUFBQyxJQUFBLGNBQVMsR0FBRSxDQUFDLENBQUM7WUFFeEQsZ0NBQWdDO1lBQ2hDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLDRJQUE0STthQUN0SixDQUFDLENBQUM7WUFDSCxJQUFJO2dCQUNBLE1BQU0sSUFBSSxDQUNOLElBQUEsaUJBQVksRUFBQztvQkFDVCxxQkFBcUI7b0JBQ3JCLCtCQUErQjtpQkFDbEMsQ0FBQyxDQUNMLENBQUM7YUFDTDtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNSLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsS0FBSyxFQUFFLHNIQUFzSDtpQkFDaEksQ0FBQyxDQUFDO2FBQ047WUFFRCxRQUFRLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO2dCQUM5QixLQUFLLE1BQU07b0JBQ1Asb0JBQW9CO29CQUNwQixJQUFBLGVBQVUsRUFDTixjQUFNLENBQUMsT0FBTyxDQUNWLG1CQUFtQixFQUNuQix5QkFBeUIsQ0FDNUIsRUFDRCxjQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQyxDQUM5QyxDQUFDO29CQUVGLDBDQUEwQztvQkFDMUMsSUFBQSx3QkFBbUIsRUFDZixHQUFHLFFBQVEsaUJBQWlCLEVBQzVCLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ3BDLENBQUM7b0JBQ0YsTUFBTTtnQkFDVixLQUFLLFNBQVMsQ0FBQztnQkFDZjtvQkFDSSxvQkFBb0I7b0JBQ3BCLElBQUEsZUFBVSxFQUNOLGNBQU0sQ0FBQyxPQUFPLENBQ1YsbUJBQW1CLEVBQ25CLHlCQUF5QixDQUM1QixFQUNELGNBQU0sQ0FBQyxPQUFPLENBQ1Ysd0JBQWMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsRUFDdkMsVUFBVSxDQUNiLENBQ0osQ0FBQztvQkFFRiwwQ0FBMEM7b0JBQzFDLElBQUEsd0JBQW1CLEVBQ2YsR0FBRyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQ3JELENBQUMsbUJBQW1CLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ25DLENBQUM7b0JBRUYsTUFBTTthQUNiO1lBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEVBQUUsdUZBQXVGO2FBQ2pHLENBQUMsQ0FBQztZQUVILE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtDQUNKLENBQUM7QUFDRixrQkFBZSxlQUFlLENBQUMifQ==