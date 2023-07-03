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
import { __dirname, __readJsonSync, __writeJsonSync, } from '@coffeekraken/sugar/fs';
import { __packageJsonSync } from '@coffeekraken/sugar/package';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';
/**
 * @name        manifestIngredient
 * @namespace   node.ingredients.manifest
 * @type        ISKitchenIngredient
 * @static
 *
 * This ingredient represent the "manifest.json" file at the root of your project
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const manifestIngredient = {
    id: 'manifest',
    description: 'Add the default <cyan>manifest.json</cyan> into your <magenta>sugar</magenta> project',
    projectTypes: ['unknown', 'sugar', 'next'],
    add() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const packageJson = __packageJsonSync();
            const publicDir = __SSugarConfig.get('storage.src.publicDir');
            if (__fs.existsSync(`${publicDir}/manifest.json`)) {
                const json = __readJsonSync(`${publicDir}/manifest.json`);
                json.short_name = packageJson.name;
                json.name = packageJson.description;
                __writeJsonSync(`${publicDir}/manifest.json`, json);
            }
            else {
                const json = __readJsonSync(`${__packageRootDir(__dirname())}/src/data/manifest/manifest.json`);
                json.short_name = packageJson.name;
                json.name = packageJson.description;
                __writeJsonSync(`${publicDir}/manifest.json`, json);
            }
            (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `<green>[manifest]</green> Default <cyan>manifest.json</cyan> file addedd <green>successfully</green>`);
            return true;
        });
    },
};
export default manifestIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFDSCxTQUFTLEVBQ1QsY0FBYyxFQUNkLGVBQWUsR0FDbEIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFHdEI7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sa0JBQWtCLEdBQXdCO0lBQzVDLEVBQUUsRUFBRSxVQUFVO0lBQ2QsV0FBVyxFQUNQLHVGQUF1RjtJQUMzRixZQUFZLEVBQUUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQztJQUNwQyxHQUFHOzs7WUFDTCxNQUFNLFdBQVcsR0FBRyxpQkFBaUIsRUFBRSxDQUFDO1lBRXhDLE1BQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUU5RCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxTQUFTLGdCQUFnQixDQUFDLEVBQUU7Z0JBQy9DLE1BQU0sSUFBSSxHQUFHLGNBQWMsQ0FBQyxHQUFHLFNBQVMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDMUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO2dCQUNuQyxJQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUM7Z0JBQ3BDLGVBQWUsQ0FBQyxHQUFHLFNBQVMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDdkQ7aUJBQU07Z0JBQ0gsTUFBTSxJQUFJLEdBQUcsY0FBYyxDQUN2QixHQUFHLGdCQUFnQixDQUNmLFNBQVMsRUFBRSxDQUNkLGtDQUFrQyxDQUN0QyxDQUFDO2dCQUNGLElBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztnQkFDbkMsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDO2dCQUNwQyxlQUFlLENBQUMsR0FBRyxTQUFTLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3ZEO1lBRUQsTUFBQSxPQUFPLENBQUMsT0FBTyx3REFDWCxzR0FBc0csQ0FDekcsQ0FBQztZQUVGLE9BQU8sSUFBSSxDQUFDOztLQUNmO0NBQ0osQ0FBQztBQUNGLGVBQWUsa0JBQWtCLENBQUMifQ==