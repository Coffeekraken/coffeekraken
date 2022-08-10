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
const copySync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/copySync"));
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
const prependToFileSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/prependToFileSync"));
const install_1 = __importDefault(require("@coffeekraken/sugar/node/npm/install"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const path_1 = __importDefault(require("path"));
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
            const rootPath = (0, packageRoot_1.default)(process.cwd()), thisPackageRootPath = (0, packageRoot_1.default)((0, dirname_1.default)());
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
                    (0, copySync_1.default)(path_1.default.resolve(thisPackageRootPath, 'src/data/sugar/sugar.ts'), path_1.default.resolve(rootPath, 'pages/_sugar.ts'));
                    // adding the≤ import in the _app.tsx file
                    (0, prependToFileSync_1.default)(`${rootPath}/pages/_app.tsx`, ["import './_sugar';"].join('\n'));
                    break;
                case 'generic':
                default:
                    // creating the file
                    (0, copySync_1.default)(path_1.default.resolve(thisPackageRootPath, 'src/data/sugar/sugar.ts'), path_1.default.resolve(s_sugar_config_1.default.get('storage.src.jsDir'), 'sugar.ts'));
                    // adding the≤ import in the _app.tsx file
                    (0, prependToFileSync_1.default)(`${s_sugar_config_1.default.get('storage.src.jsDir')}/index.ts`, ["import './sugar';"].join('\n'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0ZBQTBEO0FBQzFELG9GQUE4RDtBQUM5RCxrRkFBNEQ7QUFDNUQsc0dBQWdGO0FBQ2hGLG1GQUFnRTtBQUNoRSw0RkFBc0U7QUFDdEUsZ0RBQTBCO0FBRzFCOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBQ0gsTUFBTSxlQUFlLEdBQXdCO0lBQ3pDLEVBQUUsRUFBRSxPQUFPO0lBQ1gsV0FBVyxFQUNQLHNFQUFzRTtJQUMxRSxZQUFZLEVBQUUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQztJQUNwQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFOztZQUN2QyxNQUFNLFFBQVEsR0FBRyxJQUFBLHFCQUFhLEVBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQ3pDLG1CQUFtQixHQUFHLElBQUEscUJBQWEsRUFBQyxJQUFBLGlCQUFTLEdBQUUsQ0FBQyxDQUFDO1lBRXJELGdDQUFnQztZQUNoQyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLEtBQUssRUFBRSw0SUFBNEk7YUFDdEosQ0FBQyxDQUFDO1lBQ0gsSUFBSTtnQkFDQSxNQUFNLElBQUksQ0FDTixJQUFBLGlCQUFZLEVBQUM7b0JBQ1QscUJBQXFCO29CQUNyQiwrQkFBK0I7aUJBQ2xDLENBQUMsQ0FDTCxDQUFDO2FBQ0w7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDUixJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLEtBQUssRUFBRSxzSEFBc0g7aUJBQ2hJLENBQUMsQ0FBQzthQUNOO1lBRUQsUUFBUSxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTtnQkFDOUIsS0FBSyxNQUFNO29CQUNQLG9CQUFvQjtvQkFDcEIsSUFBQSxrQkFBVSxFQUNOLGNBQU0sQ0FBQyxPQUFPLENBQ1YsbUJBQW1CLEVBQ25CLHlCQUF5QixDQUM1QixFQUNELGNBQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLGlCQUFpQixDQUFDLENBQzlDLENBQUM7b0JBRUYsMENBQTBDO29CQUMxQyxJQUFBLDJCQUFtQixFQUNmLEdBQUcsUUFBUSxpQkFBaUIsRUFDNUIsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDcEMsQ0FBQztvQkFDRixNQUFNO2dCQUNWLEtBQUssU0FBUyxDQUFDO2dCQUNmO29CQUNJLG9CQUFvQjtvQkFDcEIsSUFBQSxrQkFBVSxFQUNOLGNBQU0sQ0FBQyxPQUFPLENBQ1YsbUJBQW1CLEVBQ25CLHlCQUF5QixDQUM1QixFQUNELGNBQU0sQ0FBQyxPQUFPLENBQ1Ysd0JBQWMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsRUFDdkMsVUFBVSxDQUNiLENBQ0osQ0FBQztvQkFFRiwwQ0FBMEM7b0JBQzFDLElBQUEsMkJBQW1CLEVBQ2YsR0FBRyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQ3JELENBQUMsbUJBQW1CLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ25DLENBQUM7b0JBRUYsTUFBTTthQUNiO1lBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEVBQUUsdUZBQXVGO2FBQ2pHLENBQUMsQ0FBQztZQUVILE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtDQUNKLENBQUM7QUFDRixrQkFBZSxlQUFlLENBQUMifQ==