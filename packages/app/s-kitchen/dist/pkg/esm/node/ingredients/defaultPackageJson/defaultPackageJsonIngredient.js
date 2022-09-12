var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
/**
 * @name        defaultPackageJsonIngredient
 * @namespace   node.ingredients.defaultPackageJson
 * @type        ISKitchenIngredient
 * @static
 *
 * This ingredient represent the default package.json scripts, dependencies, etc...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const defaultPackageJsonIngredient = {
    id: 'defaultPackageJson',
    description: 'Apply the <yellow>config.package.defaultPackageJson</yellow> object on your <cyan>package.json</cyan> file',
    projectTypes: ['unknown', 'sugar'],
    add({ ask, log, emit, context }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const packageRoot = __packageRootDir();
            let json = {};
            if (__fs.existsSync(`${packageRoot}/package.json`)) {
                json = JSON.parse(__fs.readFileSync(`${packageRoot}/package.json`).toString());
            }
            json = __deepMerge(json, (_a = __SSugarConfig.get('package.defaultPackageJson')) !== null && _a !== void 0 ? _a : {});
            __fs.writeFileSync(`${packageRoot}/package.json`, JSON.stringify(json, null, 4));
            return true;
        });
    },
};
export default defaultPackageJsonIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUV0Qjs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSw0QkFBNEIsR0FBd0I7SUFDdEQsRUFBRSxFQUFFLG9CQUFvQjtJQUN4QixXQUFXLEVBQ1AsNEdBQTRHO0lBQ2hILFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUM7SUFDNUIsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFOzs7WUFDakMsTUFBTSxXQUFXLEdBQUcsZ0JBQWdCLEVBQUUsQ0FBQztZQUV2QyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7WUFDZCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxXQUFXLGVBQWUsQ0FBQyxFQUFFO2dCQUNoRCxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FDYixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsV0FBVyxlQUFlLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FDOUQsQ0FBQzthQUNMO1lBQ0QsSUFBSSxHQUFHLFdBQVcsQ0FDZCxJQUFJLEVBQ0osTUFBQSxjQUFjLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLG1DQUFJLEVBQUUsQ0FDekQsQ0FBQztZQUNGLElBQUksQ0FBQyxhQUFhLENBQ2QsR0FBRyxXQUFXLGVBQWUsRUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUNoQyxDQUFDO1lBRUYsT0FBTyxJQUFJLENBQUM7O0tBQ2Y7Q0FDSixDQUFDO0FBQ0YsZUFBZSw0QkFBNEIsQ0FBQyJ9