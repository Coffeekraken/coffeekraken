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
const path_1 = require("@coffeekraken/sugar/path");
const path_2 = __importDefault(require("path"));
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
    add({ ask, log, context }) {
        return __awaiter(this, void 0, void 0, function* () {
            // source file path
            const sourceFilePath = path_2.default.resolve((0, path_1.__packageRootDir)((0, fs_1.__dirname)()), `src/data/defaultScripts`);
            if (!context.new &&
                !(yield ask({
                    type: 'confirm',
                    message: 'This process will override your current index.ts file if some already exists. Are you ok with that?',
                    default: true,
                }))) {
                return false;
            }
            // source views folder path
            const jsDir = s_sugar_config_1.default.get('storage.src.jsDir');
            yield (0, recursive_copy_1.default)(sourceFilePath, jsDir, {
                overwrite: true,
            });
            return true;
        });
    },
};
exports.default = defaultScriptsIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0ZBQTBEO0FBQzFELCtDQUFtRDtBQUNuRCxtREFBNEQ7QUFDNUQsZ0RBQTBCO0FBQzFCLG9FQUE2QztBQUc3Qzs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSx3QkFBd0IsR0FBd0I7SUFDbEQsRUFBRSxFQUFFLGdCQUFnQjtJQUNwQixXQUFXLEVBQ1AsdUZBQXVGO0lBQzNGLFlBQVksRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7SUFDNUIsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUU7O1lBQzNCLG1CQUFtQjtZQUNuQixNQUFNLGNBQWMsR0FBRyxjQUFNLENBQUMsT0FBTyxDQUNqQyxJQUFBLHVCQUFnQixFQUFDLElBQUEsY0FBUyxHQUFFLENBQUMsRUFDN0IseUJBQXlCLENBQzVCLENBQUM7WUFFRixJQUNJLENBQUMsT0FBTyxDQUFDLEdBQUc7Z0JBQ1osQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDO29CQUNSLElBQUksRUFBRSxTQUFTO29CQUNmLE9BQU8sRUFDSCxxR0FBcUc7b0JBQ3pHLE9BQU8sRUFBRSxJQUFJO2lCQUNoQixDQUFDLENBQUMsRUFDTDtnQkFDRSxPQUFPLEtBQUssQ0FBQzthQUNoQjtZQUVELDJCQUEyQjtZQUMzQixNQUFNLEtBQUssR0FBRyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBRXRELE1BQU0sSUFBQSx3QkFBZSxFQUFDLGNBQWMsRUFBRSxLQUFLLEVBQUU7Z0JBQ3pDLFNBQVMsRUFBRSxJQUFJO2FBQ2xCLENBQUMsQ0FBQztZQUVILE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtDQUNKLENBQUM7QUFDRixrQkFBZSx3QkFBd0IsQ0FBQyJ9