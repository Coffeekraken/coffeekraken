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
import __fs from 'fs';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __path from 'path';
/**
 * @name        readmeIngredient
 * @namespace   node.ingredients.manifest
 * @type        ISKitchenIngredient
 * @static
 *
 * This ingredient represent the base "README.md" file in your src/doc folder
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const readmeIngredient = {
    id: 'readme',
    description: 'Add the default <cyan>README.md</cyan> file into your project',
    projectTypes: ['unknown', 'sugar'],
    add({ ask }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const input = __SSugarConfig.get('readme.input'), output = __SSugarConfig.get('readme.output');
            if (__fs.existsSync(input) &&
                !(yield ask({
                    type: 'confirm',
                    message: 'A README file already exists. Would you like to override it?',
                    default: true,
                }))) {
                return false;
            }
            const sourceReadmePath = __path.resolve(__packageRootDir(__dirname()), 'src/data/readme/README.md.twig');
            // copy the file to the project root
            __copySync(sourceReadmePath, input);
            // @TODO            Add the build phase
            // // build source README.md file
            // const builder = new __SMarkdownBuilder();
            // const result = await builder.build({
            //     inPath: __path.resolve(
            //         __packageRootDir(__dirname()),
            //         'src/md/README.md',
            //     ),
            //     outPath: finalParams.path,
            // });
            (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `<green>[readme]</green> <cyan>${__path.relative(__packageRootDir(), input)}</cyan> added <green>successfully</green>`);
            return true;
        });
    },
};
export default readmeIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBR3RCLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUUxQjs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxnQkFBZ0IsR0FBd0I7SUFDMUMsRUFBRSxFQUFFLFFBQVE7SUFDWixXQUFXLEVBQ1AsK0RBQStEO0lBQ25FLFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUM7SUFDNUIsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFOzs7WUFDYixNQUFNLEtBQUssR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxFQUM1QyxNQUFNLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUVqRCxJQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO2dCQUN0QixDQUFDLENBQUMsTUFBTSxHQUFHLENBQUM7b0JBQ1IsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsT0FBTyxFQUNILDhEQUE4RDtvQkFDbEUsT0FBTyxFQUFFLElBQUk7aUJBQ2hCLENBQUMsQ0FBQyxFQUNMO2dCQUNFLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1lBRUQsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUNuQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUM3QixnQ0FBZ0MsQ0FDbkMsQ0FBQztZQUVGLG9DQUFvQztZQUNwQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFFcEMsdUNBQXVDO1lBRXZDLGlDQUFpQztZQUNqQyw0Q0FBNEM7WUFDNUMsdUNBQXVDO1lBQ3ZDLDhCQUE4QjtZQUM5Qix5Q0FBeUM7WUFDekMsOEJBQThCO1lBQzlCLFNBQVM7WUFDVCxpQ0FBaUM7WUFDakMsTUFBTTtZQUVOLE1BQUEsT0FBTyxDQUFDLE9BQU8sd0RBQ1gsaUNBQWlDLE1BQU0sQ0FBQyxRQUFRLENBQzVDLGdCQUFnQixFQUFFLEVBQ2xCLEtBQUssQ0FDUiwyQ0FBMkMsQ0FDL0MsQ0FBQztZQUVGLE9BQU8sSUFBSSxDQUFDOztLQUNmO0NBQ0osQ0FBQztBQUNGLGVBQWUsZ0JBQWdCLENBQUMifQ==