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
import __copySync from '@coffeekraken/sugar/node/fs/copySync';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __path from 'path';
/**
 * @name        faviconIngredient
 * @namespace   node.ingredients.frontspec
 * @type        ISKitchenIngredient
 * @static
 *
 * This ingredient represent the "frontspec.json" file at the root of your project
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const faviconIngredient = {
    id: 'favicon',
    description: 'Add the base <cyan>favicon.png</cyan> file into your <magenta>sugar</magenta> project',
    projectTypes: ['unknown', 'sugar'],
    add({ ask, log, emit }) {
        return __awaiter(this, void 0, void 0, function* () {
            // source file path
            const sourceFilePath = __path.resolve(__packageRoot(__dirname()), `src/data/favicon/favicon.png`);
            const output = __SSugarConfig.get('faviconBuilder.input');
            // copy the file to his destination
            __copySync(sourceFilePath, output);
            return true;
        });
    },
};
export default faviconIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sVUFBVSxNQUFNLHNDQUFzQyxDQUFDO0FBQzlELE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUcxQjs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxpQkFBaUIsR0FBd0I7SUFDM0MsRUFBRSxFQUFFLFNBQVM7SUFDYixXQUFXLEVBQ1AsdUZBQXVGO0lBQzNGLFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUM7SUFDNUIsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7O1lBQ3hCLG1CQUFtQjtZQUNuQixNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUNqQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUMsRUFDMUIsOEJBQThCLENBQ2pDLENBQUM7WUFFRixNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFFMUQsbUNBQW1DO1lBQ25DLFVBQVUsQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFbkMsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztLQUFBO0NBQ0osQ0FBQztBQUNGLGVBQWUsaUJBQWlCLENBQUMifQ==