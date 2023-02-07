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
const npm_1 = require("@coffeekraken/sugar/npm");
const package_1 = require("@coffeekraken/sugar/package");
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
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const rootPath = (0, path_1.__packageRootDir)(process.cwd()), thisPackageRootPath = (0, path_1.__packageRootDir)((0, fs_1.__dirname)());
            // installing the actual package
            (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `<yellow>[sugar]</yellow> Installing the actual <cyan>@coffeekraken/sugar</cyan> and <cyan>@coffeekraken/s-sugar-feature</cyan> packages...`);
            const currentPackageJson = (0, package_1.__packageJsonSync)((0, fs_1.__dirname)());
            (0, npm_1.__addDependencies)({
                '@coffeekraken/sugar': `^${currentPackageJson.version}`,
                '@coffeekraken/s-sugar-feature': `^${currentPackageJson.version}`,
            });
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
            (_b = console.verbose) === null || _b === void 0 ? void 0 : _b.call(console, `<yellow>[sugar]</yellow> Added <green>successfully</green> in your project. Have fun!`);
            return true;
        });
    },
};
exports.default = sugarIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0ZBQTBEO0FBQzFELCtDQUlnQztBQUNoQyxpREFBNEQ7QUFDNUQseURBQWdFO0FBQ2hFLG1EQUE0RDtBQUM1RCxnREFBMEI7QUFHMUI7Ozs7Ozs7Ozs7Ozs7O0dBY0c7QUFDSCxNQUFNLGVBQWUsR0FBd0I7SUFDekMsRUFBRSxFQUFFLE9BQU87SUFDWCxXQUFXLEVBQ1Asc0VBQXNFO0lBQzFFLFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO0lBQ3BDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sRUFBRTs7O1lBQ2pCLE1BQU0sUUFBUSxHQUFHLElBQUEsdUJBQWdCLEVBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQzVDLG1CQUFtQixHQUFHLElBQUEsdUJBQWdCLEVBQUMsSUFBQSxjQUFTLEdBQUUsQ0FBQyxDQUFDO1lBRXhELGdDQUFnQztZQUNoQyxNQUFBLE9BQU8sQ0FBQyxPQUFPLHdEQUNYLDRJQUE0SSxDQUMvSSxDQUFDO1lBRUYsTUFBTSxrQkFBa0IsR0FBRyxJQUFBLDJCQUFpQixFQUFDLElBQUEsY0FBUyxHQUFFLENBQUMsQ0FBQztZQUUxRCxJQUFBLHVCQUFpQixFQUFDO2dCQUNkLHFCQUFxQixFQUFFLElBQUksa0JBQWtCLENBQUMsT0FBTyxFQUFFO2dCQUN2RCwrQkFBK0IsRUFBRSxJQUFJLGtCQUFrQixDQUFDLE9BQU8sRUFBRTthQUNwRSxDQUFDLENBQUM7WUFFSCxRQUFRLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO2dCQUM5QixLQUFLLE1BQU07b0JBQ1Asb0JBQW9CO29CQUNwQixJQUFBLGVBQVUsRUFDTixjQUFNLENBQUMsT0FBTyxDQUNWLG1CQUFtQixFQUNuQix5QkFBeUIsQ0FDNUIsRUFDRCxjQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQyxDQUM5QyxDQUFDO29CQUVGLDBDQUEwQztvQkFDMUMsSUFBQSx3QkFBbUIsRUFDZixHQUFHLFFBQVEsaUJBQWlCLEVBQzVCLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ3BDLENBQUM7b0JBQ0YsTUFBTTtnQkFDVixLQUFLLFNBQVMsQ0FBQztnQkFDZjtvQkFDSSxvQkFBb0I7b0JBQ3BCLElBQUEsZUFBVSxFQUNOLGNBQU0sQ0FBQyxPQUFPLENBQ1YsbUJBQW1CLEVBQ25CLHlCQUF5QixDQUM1QixFQUNELGNBQU0sQ0FBQyxPQUFPLENBQ1Ysd0JBQWMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsRUFDdkMsVUFBVSxDQUNiLENBQ0osQ0FBQztvQkFFRiwwQ0FBMEM7b0JBQzFDLElBQUEsd0JBQW1CLEVBQ2YsR0FBRyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQ3JELENBQUMsbUJBQW1CLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ25DLENBQUM7b0JBRUYsTUFBTTthQUNiO1lBRUQsTUFBQSxPQUFPLENBQUMsT0FBTyx3REFDWCx1RkFBdUYsQ0FDMUYsQ0FBQztZQUVGLE9BQU8sSUFBSSxDQUFDOztLQUNmO0NBQ0osQ0FBQztBQUNGLGtCQUFlLGVBQWUsQ0FBQyJ9