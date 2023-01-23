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
 * @name        defaultScriptsIngredient
 * @namespace   node.ingredients.defaultScripts
 * @type        ISKitchenIngredient
 * @static
 *
 * This ingredient represent the default scripts like features initialisation, components, etc...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const defaultScriptsIngredient = {
    id: 'defaultScripts',
    description: 'Add default scripts ("<cyan>index.ts</cyan>") to your <magenta>sugar<magenta> project',
    projectTypes: ['sugar', 'unknown'],
    add({ ask, log, context }) {
        return __awaiter(this, void 0, void 0, function* () {
            // source file path
            const sourceFilePath = __path.resolve(__packageRootDir(__dirname()), `src/data/defaultScripts`);
            if (!context.new &&
                !(yield ask({
                    type: 'confirm',
                    message: 'This process will override your current index.ts file if some already exists. Are you ok with that?',
                    default: true,
                }))) {
                return false;
            }
            // source views folder path
            const jsDir = __SSugarConfig.get('storage.src.jsDir');
            yield __recursiveCopy(sourceFilePath, jsDir, {
                overwrite: true,
            });
            return true;
        });
    },
};
export default defaultScriptsIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxlQUFlLE1BQU0sZ0JBQWdCLENBQUM7QUFHN0M7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sd0JBQXdCLEdBQXdCO0lBQ2xELEVBQUUsRUFBRSxnQkFBZ0I7SUFDcEIsV0FBVyxFQUNQLHVGQUF1RjtJQUMzRixZQUFZLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDO0lBQzVCLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFOztZQUMzQixtQkFBbUI7WUFDbkIsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FDakMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsRUFDN0IseUJBQXlCLENBQzVCLENBQUM7WUFFRixJQUNJLENBQUMsT0FBTyxDQUFDLEdBQUc7Z0JBQ1osQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDO29CQUNSLElBQUksRUFBRSxTQUFTO29CQUNmLE9BQU8sRUFDSCxxR0FBcUc7b0JBQ3pHLE9BQU8sRUFBRSxJQUFJO2lCQUNoQixDQUFDLENBQUMsRUFDTDtnQkFDRSxPQUFPLEtBQUssQ0FBQzthQUNoQjtZQUVELDJCQUEyQjtZQUMzQixNQUFNLEtBQUssR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFFdEQsTUFBTSxlQUFlLENBQUMsY0FBYyxFQUFFLEtBQUssRUFBRTtnQkFDekMsU0FBUyxFQUFFLElBQUk7YUFDbEIsQ0FBQyxDQUFDO1lBRUgsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztLQUFBO0NBQ0osQ0FBQztBQUNGLGVBQWUsd0JBQXdCLENBQUMifQ==