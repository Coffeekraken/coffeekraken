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
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const fs_1 = require("@coffeekraken/sugar/fs");
const path_1 = require("@coffeekraken/sugar/path");
const fs_2 = __importDefault(require("fs"));
/**
 * @name        sugarJsonIngredient
 * @namespace   node.ingredients.manifest
 * @type        ISKitchenIngredient
 * @static
 *
 * This ingredient represent the "manifest.json" file at the root of your project
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const sugarJsonIngredient = {
    id: 'sugarJson',
    description: 'Add the default <cyan>sugar.json</cyan> in your project',
    projectTypes: ['*'],
    add({ ask, log, emit, context }) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const packageRoot = (0, path_1.__packageRootDir)();
            if (fs_2.default.existsSync(`${packageRoot}/sugar.json`)) {
                const json = (0, fs_1.__readJsonSync)(`${packageRoot}/sugar.json`);
                json.recipe = (_a = context.recipe) !== null && _a !== void 0 ? _a : 'generic';
                (0, fs_1.__writeJsonSync)(`${packageRoot}/sugar.json`, json);
            }
            else {
                (0, fs_1.__writeJsonSync)(`${packageRoot}/sugar.json`, {
                    recipe: (_b = context.recipe) !== null && _b !== void 0 ? _b : 'generic',
                });
            }
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>[sugarJson]</yellow> "<cyan>sugar.json</cyan>" file added <green>successfully</green> with the recipe <cyan>generic</cyan>`,
            });
            return true;
        });
    },
};
exports.default = sugarJsonIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQXlDO0FBQ3pDLCtDQUF5RTtBQUN6RSxtREFBNEQ7QUFDNUQsNENBQXNCO0FBR3RCOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLG1CQUFtQixHQUF3QjtJQUM3QyxFQUFFLEVBQUUsV0FBVztJQUNmLFdBQVcsRUFBRSx5REFBeUQ7SUFDdEUsWUFBWSxFQUFFLENBQUMsR0FBRyxDQUFDO0lBQ2IsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFOzs7WUFDakMsTUFBTSxXQUFXLEdBQUcsSUFBQSx1QkFBZ0IsR0FBRSxDQUFDO1lBRXZDLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFdBQVcsYUFBYSxDQUFDLEVBQUU7Z0JBQzlDLE1BQU0sSUFBSSxHQUFHLElBQUEsbUJBQWMsRUFBQyxHQUFHLFdBQVcsYUFBYSxDQUFDLENBQUM7Z0JBQ3pELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBQSxPQUFPLENBQUMsTUFBTSxtQ0FBSSxTQUFTLENBQUM7Z0JBQzFDLElBQUEsb0JBQWUsRUFBQyxHQUFHLFdBQVcsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3REO2lCQUFNO2dCQUNILElBQUEsb0JBQWUsRUFBQyxHQUFHLFdBQVcsYUFBYSxFQUFFO29CQUN6QyxNQUFNLEVBQUUsTUFBQSxPQUFPLENBQUMsTUFBTSxtQ0FBSSxTQUFTO2lCQUN0QyxDQUFDLENBQUM7YUFDTjtZQUVELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLGVBQU0sQ0FBQyxTQUFTO2dCQUN0QixLQUFLLEVBQUUsb0lBQW9JO2FBQzlJLENBQUMsQ0FBQztZQUVILE9BQU8sSUFBSSxDQUFDOztLQUNmO0NBQ0osQ0FBQztBQUNGLGtCQUFlLG1CQUFtQixDQUFDIn0=