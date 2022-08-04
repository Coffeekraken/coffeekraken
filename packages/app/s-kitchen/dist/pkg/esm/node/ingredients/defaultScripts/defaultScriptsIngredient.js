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
    add({ ask, log, emit, context }) {
        return __awaiter(this, void 0, void 0, function* () {
            // source file path
            const sourceFilePath = __path.resolve(__packageRoot(__dirname()), `src/data/defaultScripts`);
            if (!context.new &&
                !(yield ask({
                    type: 'confirm',
                    message: 'This process will override your current index.ts file if some already exists. Are you ok with that?',
                    default: true,
                }))) {
                return false;
            }
            // source views folder path
            const sourceScriptsFolderPath = __path.resolve(__path.resolve(__packageRoot(__dirname())), `src/data/defaultScripts`);
            const jsDir = __SSugarConfig.get('storage.src.jsDir');
            yield __recursiveCopy(sourceScriptsFolderPath, jsDir, {
                overwrite: true,
            });
            return true;
        });
    },
};
export default defaultScriptsIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLGVBQWUsTUFBTSxnQkFBZ0IsQ0FBQztBQUc3Qzs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSx3QkFBd0IsR0FBd0I7SUFDbEQsRUFBRSxFQUFFLGdCQUFnQjtJQUNwQixXQUFXLEVBQ1AsdUZBQXVGO0lBQzNGLFlBQVksRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7SUFDNUIsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFOztZQUNqQyxtQkFBbUI7WUFDbkIsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FDakMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQzFCLHlCQUF5QixDQUM1QixDQUFDO1lBRUYsSUFDSSxDQUFDLE9BQU8sQ0FBQyxHQUFHO2dCQUNaLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQztvQkFDUixJQUFJLEVBQUUsU0FBUztvQkFDZixPQUFPLEVBQ0gscUdBQXFHO29CQUN6RyxPQUFPLEVBQUUsSUFBSTtpQkFDaEIsQ0FBQyxDQUFDLEVBQ0w7Z0JBQ0UsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFFRCwyQkFBMkI7WUFDM0IsTUFBTSx1QkFBdUIsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUMxQyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQzFDLHlCQUF5QixDQUM1QixDQUFDO1lBRUYsTUFBTSxLQUFLLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBRXRELE1BQU0sZUFBZSxDQUFDLHVCQUF1QixFQUFFLEtBQUssRUFBRTtnQkFDbEQsU0FBUyxFQUFFLElBQUk7YUFDbEIsQ0FBQyxDQUFDO1lBRUgsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztLQUFBO0NBQ0osQ0FBQztBQUNGLGVBQWUsd0JBQXdCLENBQUMifQ==