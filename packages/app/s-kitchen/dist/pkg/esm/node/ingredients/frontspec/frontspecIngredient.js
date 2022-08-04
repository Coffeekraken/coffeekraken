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
import __copySync from '@coffeekraken/sugar/node/fs/copySync';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
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
    add({ ask, log, emit }) {
        return __awaiter(this, void 0, void 0, function* () {
            const frontspecPath = `${__packageRoot()}/frontspec.json`;
            const sourceJsonPath = __path.resolve(__packageRoot(__dirname()), 'src/data/frontspec/frontspec.json');
            // copy the file to the project root
            __copySync(sourceJsonPath, frontspecPath);
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<green>[frontspec]</green> Default <cyan>frontspec.json</cyan> file addedd <green>successfully</green>`,
            });
            return true;
        });
    },
};
export default frontspecIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHNDQUFzQyxDQUFDO0FBQzlELE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUcxQjs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxtQkFBbUIsR0FBd0I7SUFDN0MsRUFBRSxFQUFFLFdBQVc7SUFDZixXQUFXLEVBQ1AsNkZBQTZGO0lBQ2pHLFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUM7SUFDNUIsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7O1lBQ3hCLE1BQU0sYUFBYSxHQUFHLEdBQUcsYUFBYSxFQUFFLGlCQUFpQixDQUFDO1lBQzFELE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQ2pDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUMxQixtQ0FBbUMsQ0FDdEMsQ0FBQztZQUVGLG9DQUFvQztZQUNwQyxVQUFVLENBQUMsY0FBYyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBRTFDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTO2dCQUN0QixLQUFLLEVBQUUsd0dBQXdHO2FBQ2xILENBQUMsQ0FBQztZQUVILE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtDQUNKLENBQUM7QUFDRixlQUFlLG1CQUFtQixDQUFDIn0=