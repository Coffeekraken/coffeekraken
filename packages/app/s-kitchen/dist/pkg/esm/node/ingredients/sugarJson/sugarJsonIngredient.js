var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SLog from '@coffeekraken/s-log';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
import __writeJsonSync from '@coffeekraken/sugar/node/fs/writeJsonSync';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __fs from 'fs';
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
            const packageRoot = __packageRoot();
            if (__fs.existsSync(`${packageRoot}/sugar.json`)) {
                const json = __readJsonSync(`${packageRoot}/sugar.json`);
                json.recipe = (_a = context.recipe) !== null && _a !== void 0 ? _a : 'generic';
                __writeJsonSync(`${packageRoot}/sugar.json`, json);
            }
            else {
                __writeJsonSync(`${packageRoot}/sugar.json`, {
                    recipe: (_b = context.recipe) !== null && _b !== void 0 ? _b : 'generic',
                });
            }
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[sugarJson]</yellow> "<cyan>sugar.json</cyan>" file added <green>successfully</green> with the recipe <cyan>generic</cyan>`,
            });
            return true;
        });
    },
};
export default sugarJsonIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sY0FBYyxNQUFNLDBDQUEwQyxDQUFDO0FBQ3RFLE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUd0Qjs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxtQkFBbUIsR0FBd0I7SUFDN0MsRUFBRSxFQUFFLFdBQVc7SUFDZixXQUFXLEVBQUUseURBQXlEO0lBQ3RFLFlBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQztJQUNiLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTs7O1lBQ2pDLE1BQU0sV0FBVyxHQUFHLGFBQWEsRUFBRSxDQUFDO1lBRXBDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFdBQVcsYUFBYSxDQUFDLEVBQUU7Z0JBQzlDLE1BQU0sSUFBSSxHQUFHLGNBQWMsQ0FBQyxHQUFHLFdBQVcsYUFBYSxDQUFDLENBQUM7Z0JBQ3pELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBQSxPQUFPLENBQUMsTUFBTSxtQ0FBSSxTQUFTLENBQUM7Z0JBQzFDLGVBQWUsQ0FBQyxHQUFHLFdBQVcsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3REO2lCQUFNO2dCQUNILGVBQWUsQ0FBQyxHQUFHLFdBQVcsYUFBYSxFQUFFO29CQUN6QyxNQUFNLEVBQUUsTUFBQSxPQUFPLENBQUMsTUFBTSxtQ0FBSSxTQUFTO2lCQUN0QyxDQUFDLENBQUM7YUFDTjtZQUVELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO2dCQUN0QixLQUFLLEVBQUUsb0lBQW9JO2FBQzlJLENBQUMsQ0FBQztZQUVILE9BQU8sSUFBSSxDQUFDOztLQUNmO0NBQ0osQ0FBQztBQUNGLGVBQWUsbUJBQW1CLENBQUMifQ==