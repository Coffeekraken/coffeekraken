var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __readJsonSync, __writeJsonSync } from '@coffeekraken/sugar/fs';
import { __packageRootDir } from '@coffeekraken/sugar/path';
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
    add({ context }) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const packageRoot = __packageRootDir();
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
            console.log(`<yellow>[sugarJson]</yellow> "<cyan>sugar.json</cyan>" file added <green>successfully</green> with the recipe <cyan>generic</cyan>`);
            return true;
        });
    },
};
export default sugarJsonIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBR3RCOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLG1CQUFtQixHQUF3QjtJQUM3QyxFQUFFLEVBQUUsV0FBVztJQUNmLFdBQVcsRUFBRSx5REFBeUQ7SUFDdEUsWUFBWSxFQUFFLENBQUMsR0FBRyxDQUFDO0lBQ2IsR0FBRyxDQUFDLEVBQUUsT0FBTyxFQUFFOzs7WUFDakIsTUFBTSxXQUFXLEdBQUcsZ0JBQWdCLEVBQUUsQ0FBQztZQUV2QyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxXQUFXLGFBQWEsQ0FBQyxFQUFFO2dCQUM5QyxNQUFNLElBQUksR0FBRyxjQUFjLENBQUMsR0FBRyxXQUFXLGFBQWEsQ0FBQyxDQUFDO2dCQUN6RCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQUEsT0FBTyxDQUFDLE1BQU0sbUNBQUksU0FBUyxDQUFDO2dCQUMxQyxlQUFlLENBQUMsR0FBRyxXQUFXLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUN0RDtpQkFBTTtnQkFDSCxlQUFlLENBQUMsR0FBRyxXQUFXLGFBQWEsRUFBRTtvQkFDekMsTUFBTSxFQUFFLE1BQUEsT0FBTyxDQUFDLE1BQU0sbUNBQUksU0FBUztpQkFDdEMsQ0FBQyxDQUFDO2FBQ047WUFFRCxPQUFPLENBQUMsR0FBRyxDQUNQLG9JQUFvSSxDQUN2SSxDQUFDO1lBRUYsT0FBTyxJQUFJLENBQUM7O0tBQ2Y7Q0FDSixDQUFDO0FBQ0YsZUFBZSxtQkFBbUIsQ0FBQyJ9