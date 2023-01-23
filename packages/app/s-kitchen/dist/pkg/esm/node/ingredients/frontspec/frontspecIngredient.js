var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __copySync, __dirname } from '@coffeekraken/sugar/fs';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __path from 'path';
/**
 * @name        frontspecIngredient
 * @namespace   node.ingredients.frontspec
 * @type        ISKitchenIngredient
 * @static
 *
 * This ingredient represent the "frontspec.json" file at the root of your project
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const frontspecIngredient = {
    id: 'frontspec',
    description: 'Add the default <cyan>frontspec.json</cyan> file into your <magenta>sugar</magenta> project',
    projectTypes: ['unknown', 'sugar'],
    add() {
        return __awaiter(this, void 0, void 0, function* () {
            const frontspecPath = `${__packageRootDir()}/frontspec.json`;
            const sourceJsonPath = __path.resolve(__packageRootDir(__dirname()), 'src/data/frontspec/frontspec.json');
            // copy the file to the project root
            __copySync(sourceJsonPath, frontspecPath);
            console.log(`<green>[frontspec]</green> Default <cyan>frontspec.json</cyan> file addedd <green>successfully</green>`);
            return true;
        });
    },
};
export default frontspecIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBRzFCOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLG1CQUFtQixHQUF3QjtJQUM3QyxFQUFFLEVBQUUsV0FBVztJQUNmLFdBQVcsRUFDUCw2RkFBNkY7SUFDakcsWUFBWSxFQUFFLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQztJQUM1QixHQUFHOztZQUNMLE1BQU0sYUFBYSxHQUFHLEdBQUcsZ0JBQWdCLEVBQUUsaUJBQWlCLENBQUM7WUFDN0QsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FDakMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsRUFDN0IsbUNBQW1DLENBQ3RDLENBQUM7WUFFRixvQ0FBb0M7WUFDcEMsVUFBVSxDQUFDLGNBQWMsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUUxQyxPQUFPLENBQUMsR0FBRyxDQUNQLHdHQUF3RyxDQUMzRyxDQUFDO1lBRUYsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztLQUFBO0NBQ0osQ0FBQztBQUNGLGVBQWUsbUJBQW1CLENBQUMifQ==