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
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
import __writeJsonSync from '@coffeekraken/sugar/node/fs/writeJsonSync';
import __packageJson from '@coffeekraken/sugar/node/package/jsonSync';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
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
    add({ ask, log, emit }) {
        return __awaiter(this, void 0, void 0, function* () {
            const packageJson = __packageJson();
            const publicDir = __SSugarConfig.get('storage.src.publicDir');
            if (__fs.existsSync(`${publicDir}/manifest.json`)) {
                const json = __readJsonSync(`${publicDir}/manifest.json`);
                json.short_name = packageJson.name;
                json.name = packageJson.description;
                __writeJsonSync(`${publicDir}/manifest.json`, json);
            }
            else {
                const json = __readJsonSync(`${__packageRoot(__dirname())}/src/data/manifest/manifest.json`);
                json.short_name = packageJson.name;
                json.name = packageJson.description;
                __writeJsonSync(`${publicDir}/manifest.json`, json);
            }
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<green>[manifest]</green> Default <cyan>manifest.json</cyan> file addedd <green>successfully</green>`,
            });
            return true;
        });
    },
};
export default manifestIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sY0FBYyxNQUFNLDBDQUEwQyxDQUFDO0FBQ3RFLE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUd0Qjs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxrQkFBa0IsR0FBd0I7SUFDNUMsRUFBRSxFQUFFLFVBQVU7SUFDZCxXQUFXLEVBQ1AsdUZBQXVGO0lBQzNGLFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO0lBQ3BDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFOztZQUN4QixNQUFNLFdBQVcsR0FBRyxhQUFhLEVBQUUsQ0FBQztZQUVwQyxNQUFNLFNBQVMsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFFOUQsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsU0FBUyxnQkFBZ0IsQ0FBQyxFQUFFO2dCQUMvQyxNQUFNLElBQUksR0FBRyxjQUFjLENBQUMsR0FBRyxTQUFTLGdCQUFnQixDQUFDLENBQUM7Z0JBQzFELElBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztnQkFDbkMsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDO2dCQUNwQyxlQUFlLENBQUMsR0FBRyxTQUFTLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3ZEO2lCQUFNO2dCQUNILE1BQU0sSUFBSSxHQUFHLGNBQWMsQ0FDdkIsR0FBRyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUMsa0NBQWtDLENBQ2xFLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO2dCQUNuQyxJQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUM7Z0JBQ3BDLGVBQWUsQ0FBQyxHQUFHLFNBQVMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDdkQ7WUFFRCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUztnQkFDdEIsS0FBSyxFQUFFLHNHQUFzRzthQUNoSCxDQUFDLENBQUM7WUFFSCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0tBQUE7Q0FDSixDQUFDO0FBQ0YsZUFBZSxrQkFBa0IsQ0FBQyJ9