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
const readJsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/readJsonSync"));
const writeJsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/writeJsonSync"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const fs_1 = __importDefault(require("fs"));
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
            const packageRoot = (0, packageRoot_1.default)();
            if (fs_1.default.existsSync(`${packageRoot}/sugar.json`)) {
                const json = (0, readJsonSync_1.default)(`${packageRoot}/sugar.json`);
                json.recipe = (_a = context.recipe) !== null && _a !== void 0 ? _a : 'generic';
                (0, writeJsonSync_1.default)(`${packageRoot}/sugar.json`, json);
            }
            else {
                (0, writeJsonSync_1.default)(`${packageRoot}/sugar.json`, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQXlDO0FBQ3pDLDRGQUFzRTtBQUN0RSw4RkFBd0U7QUFDeEUsNEZBQXNFO0FBQ3RFLDRDQUFzQjtBQUd0Qjs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxtQkFBbUIsR0FBd0I7SUFDN0MsRUFBRSxFQUFFLFdBQVc7SUFDZixXQUFXLEVBQUUseURBQXlEO0lBQ3RFLFlBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQztJQUNiLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTs7O1lBQ2pDLE1BQU0sV0FBVyxHQUFHLElBQUEscUJBQWEsR0FBRSxDQUFDO1lBRXBDLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFdBQVcsYUFBYSxDQUFDLEVBQUU7Z0JBQzlDLE1BQU0sSUFBSSxHQUFHLElBQUEsc0JBQWMsRUFBQyxHQUFHLFdBQVcsYUFBYSxDQUFDLENBQUM7Z0JBQ3pELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBQSxPQUFPLENBQUMsTUFBTSxtQ0FBSSxTQUFTLENBQUM7Z0JBQzFDLElBQUEsdUJBQWUsRUFBQyxHQUFHLFdBQVcsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3REO2lCQUFNO2dCQUNILElBQUEsdUJBQWUsRUFBQyxHQUFHLFdBQVcsYUFBYSxFQUFFO29CQUN6QyxNQUFNLEVBQUUsTUFBQSxPQUFPLENBQUMsTUFBTSxtQ0FBSSxTQUFTO2lCQUN0QyxDQUFDLENBQUM7YUFDTjtZQUVELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLGVBQU0sQ0FBQyxTQUFTO2dCQUN0QixLQUFLLEVBQUUsb0lBQW9JO2FBQzlJLENBQUMsQ0FBQztZQUVILE9BQU8sSUFBSSxDQUFDOztLQUNmO0NBQ0osQ0FBQztBQUNGLGtCQUFlLG1CQUFtQixDQUFDIn0=