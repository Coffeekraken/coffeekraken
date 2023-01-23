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
import { __dirname } from '@coffeekraken/sugar/fs';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __path from 'path';
import __recursiveCopy from 'recursive-copy';
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
            const sourceFilePath = __path.resolve(__packageRootDir(__dirname()), `src/data/defaultPages`);
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
            const sourceViewsFolderPath = __path.resolve(__path.resolve(__packageRootDir(__dirname())), `src/data/defaultPages/${engine}/views`);
            // source pages folder path
            const sourcePagesFolderPath = __path.resolve(__path.resolve(__packageRootDir(__dirname())), `src/data/defaultPages/${engine}/pages`);
            const pagesDir = __SSugarConfig.get('storage.src.pagesDir'), viewsDir = __SSugarConfig.get('storage.src.viewsDir');
            const pagesResult = yield __recursiveCopy(sourcePagesFolderPath, pagesDir, {
                overwrite: true,
            });
            const viewsResult = yield __recursiveCopy(sourceViewsFolderPath, viewsDir, {
                overwrite: true,
            });
            return true;
        });
    },
};
export default defaultPagesIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxlQUFlLE1BQU0sZ0JBQWdCLENBQUM7QUFHN0M7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sc0JBQXNCLEdBQXdCO0lBQ2hELEVBQUUsRUFBRSxjQUFjO0lBQ2xCLFdBQVcsRUFDUCw4RUFBOEU7SUFDbEYsWUFBWSxFQUFFLENBQUMsT0FBTyxDQUFDO0lBQ2pCLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFOztZQUMzQixtQkFBbUI7WUFDbkIsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FDakMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsRUFDN0IsdUJBQXVCLENBQzFCLENBQUM7WUFFRixJQUNJLENBQUMsT0FBTyxDQUFDLEdBQUc7Z0JBQ1osQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDO29CQUNSLElBQUksRUFBRSxTQUFTO29CQUNmLE9BQU8sRUFDSCw2SkFBNko7b0JBQ2pLLE9BQU8sRUFBRSxJQUFJO2lCQUNoQixDQUFDLENBQUMsRUFDTDtnQkFDRSxPQUFPLEtBQUssQ0FBQzthQUNoQjtZQUVELE1BQU0sTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDO2dCQUNyQixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsMENBQTBDO2dCQUNuRCxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO2dCQUMxQixPQUFPLEVBQUUsT0FBTzthQUNuQixDQUFDLENBQUM7WUFFSCwyQkFBMkI7WUFDM0IsTUFBTSxxQkFBcUIsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUN4QyxNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFDN0MseUJBQXlCLE1BQU0sUUFBUSxDQUMxQyxDQUFDO1lBQ0YsMkJBQTJCO1lBQzNCLE1BQU0scUJBQXFCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FDeEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQzdDLHlCQUF5QixNQUFNLFFBQVEsQ0FDMUMsQ0FBQztZQUVGLE1BQU0sUUFBUSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsRUFDdkQsUUFBUSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUUxRCxNQUFNLFdBQVcsR0FBRyxNQUFNLGVBQWUsQ0FDckMscUJBQXFCLEVBQ3JCLFFBQVEsRUFDUjtnQkFDSSxTQUFTLEVBQUUsSUFBSTthQUNsQixDQUNKLENBQUM7WUFDRixNQUFNLFdBQVcsR0FBRyxNQUFNLGVBQWUsQ0FDckMscUJBQXFCLEVBQ3JCLFFBQVEsRUFDUjtnQkFDSSxTQUFTLEVBQUUsSUFBSTthQUNsQixDQUNKLENBQUM7WUFFRixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0tBQUE7Q0FDSixDQUFDO0FBQ0YsZUFBZSxzQkFBc0IsQ0FBQyJ9