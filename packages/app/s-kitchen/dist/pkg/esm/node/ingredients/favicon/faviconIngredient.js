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
import { __copySync, __dirname } from '@coffeekraken/sugar/fs';
import { __packageRootDir } from '@coffeekraken/sugar/path';
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
    add() {
        return __awaiter(this, void 0, void 0, function* () {
            // source file path
            const sourceFilePath = __path.resolve(__packageRootDir(__dirname()), `src/data/favicon/favicon.png`);
            const output = __SSugarConfig.get('faviconBuilder.input');
            // copy the file to his destination
            __copySync(sourceFilePath, output);
            return true;
        });
    },
};
export default faviconIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBRzFCOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLGlCQUFpQixHQUF3QjtJQUMzQyxFQUFFLEVBQUUsU0FBUztJQUNiLFdBQVcsRUFDUCx1RkFBdUY7SUFDM0YsWUFBWSxFQUFFLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQztJQUM1QixHQUFHOztZQUNMLG1CQUFtQjtZQUNuQixNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUNqQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUM3Qiw4QkFBOEIsQ0FDakMsQ0FBQztZQUVGLE1BQU0sTUFBTSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUUxRCxtQ0FBbUM7WUFDbkMsVUFBVSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUVuQyxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0tBQUE7Q0FDSixDQUFDO0FBQ0YsZUFBZSxpQkFBaUIsQ0FBQyJ9