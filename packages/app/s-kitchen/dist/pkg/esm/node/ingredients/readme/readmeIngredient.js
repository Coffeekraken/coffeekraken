var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __copySync } from '@coffeekraken/sugar/fs';
import { __dirname } from '@coffeekraken/sugar/fs';
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
    add({ ask, log, emit }) {
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
            const sourceReadmePath = __path.resolve(__packageRootDir(__dirname()), 'src/data/readme/README.md');
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
            emit('log', {
                value: `<green>[readme]</green> <cyan>${__path.relative(__packageRootDir(), input)}</cyan> added <green>successfully</green>`,
            });
            return true;
        });
    },
};
export default readmeIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBR3RCLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUUxQjs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxnQkFBZ0IsR0FBd0I7SUFDMUMsRUFBRSxFQUFFLFFBQVE7SUFDWixXQUFXLEVBQ1AsK0RBQStEO0lBQ25FLFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUM7SUFDNUIsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7O1lBQ3hCLE1BQU0sS0FBSyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEVBQzVDLE1BQU0sR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBRWpELElBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQztvQkFDUixJQUFJLEVBQUUsU0FBUztvQkFDZixPQUFPLEVBQ0gsOERBQThEO29CQUNsRSxPQUFPLEVBQUUsSUFBSTtpQkFDaEIsQ0FBQyxDQUFDLEVBQ0w7Z0JBQ0UsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFFRCxNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQ25DLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQzdCLDJCQUEyQixDQUM5QixDQUFDO1lBRUYsb0NBQW9DO1lBQ3BDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUVwQyx1Q0FBdUM7WUFFdkMsaUNBQWlDO1lBQ2pDLDRDQUE0QztZQUM1Qyx1Q0FBdUM7WUFDdkMsOEJBQThCO1lBQzlCLHlDQUF5QztZQUN6Qyw4QkFBOEI7WUFDOUIsU0FBUztZQUNULGlDQUFpQztZQUNqQyxNQUFNO1lBRU4sSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEVBQUUsaUNBQWlDLE1BQU0sQ0FBQyxRQUFRLENBQ25ELGdCQUFnQixFQUFFLEVBQ2xCLEtBQUssQ0FDUiwyQ0FBMkM7YUFDL0MsQ0FBQyxDQUFDO1lBRUgsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztLQUFBO0NBQ0osQ0FBQztBQUNGLGVBQWUsZ0JBQWdCLENBQUMifQ==