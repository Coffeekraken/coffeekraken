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
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
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
    add({ ask, log, emit, context }) {
        return __awaiter(this, void 0, void 0, function* () {
            // source file path
            const sourceFilePath = __path.resolve(__packageRoot(__dirname()), `src/data/defaultPages`);
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
            const sourceViewsFolderPath = __path.resolve(__path.resolve(__packageRoot(__dirname())), `src/data/defaultPages/${engine}/views`);
            // source pages folder path
            const sourcePagesFolderPath = __path.resolve(__path.resolve(__packageRoot(__dirname())), `src/data/defaultPages/${engine}/pages`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLGVBQWUsTUFBTSxnQkFBZ0IsQ0FBQztBQUc3Qzs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxzQkFBc0IsR0FBd0I7SUFDaEQsRUFBRSxFQUFFLGNBQWM7SUFDbEIsV0FBVyxFQUNQLDhFQUE4RTtJQUNsRixZQUFZLEVBQUUsQ0FBQyxPQUFPLENBQUM7SUFDakIsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFOztZQUNqQyxtQkFBbUI7WUFDbkIsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FDakMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQzFCLHVCQUF1QixDQUMxQixDQUFDO1lBRUYsSUFDSSxDQUFDLE9BQU8sQ0FBQyxHQUFHO2dCQUNaLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQztvQkFDUixJQUFJLEVBQUUsU0FBUztvQkFDZixPQUFPLEVBQ0gsNkpBQTZKO29CQUNqSyxPQUFPLEVBQUUsSUFBSTtpQkFDaEIsQ0FBQyxDQUFDLEVBQ0w7Z0JBQ0UsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFFRCxNQUFNLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQztnQkFDckIsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLDBDQUEwQztnQkFDbkQsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQztnQkFDMUIsT0FBTyxFQUFFLE9BQU87YUFDbkIsQ0FBQyxDQUFDO1lBRUgsMkJBQTJCO1lBQzNCLE1BQU0scUJBQXFCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FDeEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUMxQyx5QkFBeUIsTUFBTSxRQUFRLENBQzFDLENBQUM7WUFDRiwyQkFBMkI7WUFDM0IsTUFBTSxxQkFBcUIsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUN4QyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQzFDLHlCQUF5QixNQUFNLFFBQVEsQ0FDMUMsQ0FBQztZQUVGLE1BQU0sUUFBUSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsRUFDdkQsUUFBUSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUUxRCxNQUFNLFdBQVcsR0FBRyxNQUFNLGVBQWUsQ0FDckMscUJBQXFCLEVBQ3JCLFFBQVEsRUFDUjtnQkFDSSxTQUFTLEVBQUUsSUFBSTthQUNsQixDQUNKLENBQUM7WUFDRixNQUFNLFdBQVcsR0FBRyxNQUFNLGVBQWUsQ0FDckMscUJBQXFCLEVBQ3JCLFFBQVEsRUFDUjtnQkFDSSxTQUFTLEVBQUUsSUFBSTthQUNsQixDQUNKLENBQUM7WUFFRixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0tBQUE7Q0FDSixDQUFDO0FBQ0YsZUFBZSxzQkFBc0IsQ0FBQyJ9