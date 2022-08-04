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
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const path_1 = __importDefault(require("path"));
const recursive_copy_1 = __importDefault(require("recursive-copy"));
/**
 * @name        defaultScriptsIngredient
 * @namespace   node.ingredients.defaultScripts
 * @type        ISKitchenIngredient
 * @static
 *
 * This ingredient represent the default scripts like features initialisation, components, etc...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const defaultScriptsIngredient = {
    id: 'defaultScripts',
    description: 'Add default scripts ("<cyan>index.ts</cyan>") to your <magenta>sugar<magenta> project',
    projectTypes: ['sugar', 'unknown'],
    add({ ask, log, emit, context }) {
        return __awaiter(this, void 0, void 0, function* () {
            // source file path
            const sourceFilePath = path_1.default.resolve((0, packageRoot_1.default)((0, dirname_1.default)()), `src/data/defaultScripts`);
            if (!context.new &&
                !(yield ask({
                    type: 'confirm',
                    message: 'This process will override your current index.ts file if some already exists. Are you ok with that?',
                    default: true,
                }))) {
                return false;
            }
            // source views folder path
            const sourceScriptsFolderPath = path_1.default.resolve(path_1.default.resolve((0, packageRoot_1.default)((0, dirname_1.default)())), `src/data/defaultScripts`);
            const jsDir = s_sugar_config_1.default.get('storage.src.jsDir');
            yield (0, recursive_copy_1.default)(sourceScriptsFolderPath, jsDir, {
                overwrite: true,
            });
            return true;
        });
    },
};
exports.default = defaultScriptsIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0ZBQTBEO0FBQzFELGtGQUE0RDtBQUM1RCw0RkFBc0U7QUFDdEUsZ0RBQTBCO0FBQzFCLG9FQUE2QztBQUc3Qzs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSx3QkFBd0IsR0FBd0I7SUFDbEQsRUFBRSxFQUFFLGdCQUFnQjtJQUNwQixXQUFXLEVBQ1AsdUZBQXVGO0lBQzNGLFlBQVksRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7SUFDNUIsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFOztZQUNqQyxtQkFBbUI7WUFDbkIsTUFBTSxjQUFjLEdBQUcsY0FBTSxDQUFDLE9BQU8sQ0FDakMsSUFBQSxxQkFBYSxFQUFDLElBQUEsaUJBQVMsR0FBRSxDQUFDLEVBQzFCLHlCQUF5QixDQUM1QixDQUFDO1lBRUYsSUFDSSxDQUFDLE9BQU8sQ0FBQyxHQUFHO2dCQUNaLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQztvQkFDUixJQUFJLEVBQUUsU0FBUztvQkFDZixPQUFPLEVBQ0gscUdBQXFHO29CQUN6RyxPQUFPLEVBQUUsSUFBSTtpQkFDaEIsQ0FBQyxDQUFDLEVBQ0w7Z0JBQ0UsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFFRCwyQkFBMkI7WUFDM0IsTUFBTSx1QkFBdUIsR0FBRyxjQUFNLENBQUMsT0FBTyxDQUMxQyxjQUFNLENBQUMsT0FBTyxDQUFDLElBQUEscUJBQWEsRUFBQyxJQUFBLGlCQUFTLEdBQUUsQ0FBQyxDQUFDLEVBQzFDLHlCQUF5QixDQUM1QixDQUFDO1lBRUYsTUFBTSxLQUFLLEdBQUcsd0JBQWMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUV0RCxNQUFNLElBQUEsd0JBQWUsRUFBQyx1QkFBdUIsRUFBRSxLQUFLLEVBQUU7Z0JBQ2xELFNBQVMsRUFBRSxJQUFJO2FBQ2xCLENBQUMsQ0FBQztZQUVILE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtDQUNKLENBQUM7QUFDRixrQkFBZSx3QkFBd0IsQ0FBQyJ9