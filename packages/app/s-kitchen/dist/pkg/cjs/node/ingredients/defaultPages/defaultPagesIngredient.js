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
 * @name        defaultPagesIngredient
 * @namespace   node.ingredients.defaultPages
 * @type        ISKitchenIngredient
 * @static
 *
 * This ingredient represent the default pages and views like index, 404, etc...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const defaultPagesIngredient = {
    id: 'defaultPages',
    description: 'Add default pages like index, 404, etc in a <magenta>sugar</magenta> project',
    projectTypes: ['sugar'],
    add({ ask, log, context }) {
        return __awaiter(this, void 0, void 0, function* () {
            // source file path
            const sourceFilePath = path_2.default.resolve((0, path_1.__packageRootDir)((0, fs_1.__dirname)()), `src/data/defaultPages`);
            if (!context.new &&
                !(yield ask({
                    type: 'confirm',
                    message: 'This process will override your current pages/views if some already exists and match with the default pages/views that will be added. Are you ok with that?',
                    default: true,
                }))) {
                return false;
            }
            const engine = yield ask({
                type: 'select',
                message: 'Which view engine would you like to use?',
                choices: ['blade', 'twig'],
                default: 'blade',
            });
            // source views folder path
            const sourceViewsFolderPath = path_2.default.resolve(path_2.default.resolve((0, path_1.__packageRootDir)((0, fs_1.__dirname)())), `src/data/defaultPages/${engine}/views`);
            // source pages folder path
            const sourcePagesFolderPath = path_2.default.resolve(path_2.default.resolve((0, path_1.__packageRootDir)((0, fs_1.__dirname)())), `src/data/defaultPages/${engine}/pages`);
            const pagesDir = s_sugar_config_1.default.get('storage.src.pagesDir'), viewsDir = s_sugar_config_1.default.get('storage.src.viewsDir');
            const pagesResult = yield (0, recursive_copy_1.default)(sourcePagesFolderPath, pagesDir, {
                overwrite: true,
            });
            const viewsResult = yield (0, recursive_copy_1.default)(sourceViewsFolderPath, viewsDir, {
                overwrite: true,
            });
            return true;
        });
    },
};
exports.default = defaultPagesIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0ZBQTBEO0FBQzFELCtDQUFtRDtBQUNuRCxtREFBNEQ7QUFDNUQsZ0RBQTBCO0FBQzFCLG9FQUE2QztBQUc3Qzs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxzQkFBc0IsR0FBd0I7SUFDaEQsRUFBRSxFQUFFLGNBQWM7SUFDbEIsV0FBVyxFQUNQLDhFQUE4RTtJQUNsRixZQUFZLEVBQUUsQ0FBQyxPQUFPLENBQUM7SUFDakIsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUU7O1lBQzNCLG1CQUFtQjtZQUNuQixNQUFNLGNBQWMsR0FBRyxjQUFNLENBQUMsT0FBTyxDQUNqQyxJQUFBLHVCQUFnQixFQUFDLElBQUEsY0FBUyxHQUFFLENBQUMsRUFDN0IsdUJBQXVCLENBQzFCLENBQUM7WUFFRixJQUNJLENBQUMsT0FBTyxDQUFDLEdBQUc7Z0JBQ1osQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDO29CQUNSLElBQUksRUFBRSxTQUFTO29CQUNmLE9BQU8sRUFDSCw2SkFBNko7b0JBQ2pLLE9BQU8sRUFBRSxJQUFJO2lCQUNoQixDQUFDLENBQUMsRUFDTDtnQkFDRSxPQUFPLEtBQUssQ0FBQzthQUNoQjtZQUVELE1BQU0sTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDO2dCQUNyQixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsMENBQTBDO2dCQUNuRCxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO2dCQUMxQixPQUFPLEVBQUUsT0FBTzthQUNuQixDQUFDLENBQUM7WUFFSCwyQkFBMkI7WUFDM0IsTUFBTSxxQkFBcUIsR0FBRyxjQUFNLENBQUMsT0FBTyxDQUN4QyxjQUFNLENBQUMsT0FBTyxDQUFDLElBQUEsdUJBQWdCLEVBQUMsSUFBQSxjQUFTLEdBQUUsQ0FBQyxDQUFDLEVBQzdDLHlCQUF5QixNQUFNLFFBQVEsQ0FDMUMsQ0FBQztZQUNGLDJCQUEyQjtZQUMzQixNQUFNLHFCQUFxQixHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQ3hDLGNBQU0sQ0FBQyxPQUFPLENBQUMsSUFBQSx1QkFBZ0IsRUFBQyxJQUFBLGNBQVMsR0FBRSxDQUFDLENBQUMsRUFDN0MseUJBQXlCLE1BQU0sUUFBUSxDQUMxQyxDQUFDO1lBRUYsTUFBTSxRQUFRLEdBQUcsd0JBQWMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsRUFDdkQsUUFBUSxHQUFHLHdCQUFjLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFFMUQsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFBLHdCQUFlLEVBQ3JDLHFCQUFxQixFQUNyQixRQUFRLEVBQ1I7Z0JBQ0ksU0FBUyxFQUFFLElBQUk7YUFDbEIsQ0FDSixDQUFDO1lBQ0YsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFBLHdCQUFlLEVBQ3JDLHFCQUFxQixFQUNyQixRQUFRLEVBQ1I7Z0JBQ0ksU0FBUyxFQUFFLElBQUk7YUFDbEIsQ0FDSixDQUFDO1lBRUYsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztLQUFBO0NBQ0osQ0FBQztBQUNGLGtCQUFlLHNCQUFzQixDQUFDIn0=