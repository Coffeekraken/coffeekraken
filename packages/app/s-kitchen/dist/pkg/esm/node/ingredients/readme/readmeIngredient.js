var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __copySync from '@coffeekraken/sugar/node/fs/copySync';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
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
            const sourceReadmePath = __path.resolve(__packageRoot(__dirname()), 'src/data/readme/README.md');
            // copy the file to the project root
            __copySync(sourceReadmePath, input);
            // @TODO            Add the build phase
            // // build source README.md file
            // const builder = new __SMarkdownBuilder();
            // const result = await builder.build({
            //     inPath: __path.resolve(
            //         __packageRoot(__dirname()),
            //         'src/md/README.md',
            //     ),
            //     outPath: finalParams.path,
            // });
            emit('log', {
                value: `<green>[readme]</green> <cyan>${__path.relative(__packageRoot(), input)}</cyan> added <green>successfully</green>`,
            });
            return true;
        });
    },
};
export default readmeIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBVSxNQUFNLHNDQUFzQyxDQUFDO0FBQzlELE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUd0QixPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFFMUI7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sZ0JBQWdCLEdBQXdCO0lBQzFDLEVBQUUsRUFBRSxRQUFRO0lBQ1osV0FBVyxFQUNQLCtEQUErRDtJQUNuRSxZQUFZLEVBQUUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDO0lBQzVCLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFOztZQUN4QixNQUFNLEtBQUssR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxFQUM1QyxNQUFNLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUVqRCxJQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO2dCQUN0QixDQUFDLENBQUMsTUFBTSxHQUFHLENBQUM7b0JBQ1IsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsT0FBTyxFQUNILDhEQUE4RDtvQkFDbEUsT0FBTyxFQUFFLElBQUk7aUJBQ2hCLENBQUMsQ0FBQyxFQUNMO2dCQUNFLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1lBRUQsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUNuQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUMsRUFDMUIsMkJBQTJCLENBQzlCLENBQUM7WUFFRixvQ0FBb0M7WUFDcEMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRXBDLHVDQUF1QztZQUV2QyxpQ0FBaUM7WUFDakMsNENBQTRDO1lBQzVDLHVDQUF1QztZQUN2Qyw4QkFBOEI7WUFDOUIsc0NBQXNDO1lBQ3RDLDhCQUE4QjtZQUM5QixTQUFTO1lBQ1QsaUNBQWlDO1lBQ2pDLE1BQU07WUFFTixJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLEtBQUssRUFBRSxpQ0FBaUMsTUFBTSxDQUFDLFFBQVEsQ0FDbkQsYUFBYSxFQUFFLEVBQ2YsS0FBSyxDQUNSLDJDQUEyQzthQUMvQyxDQUFDLENBQUM7WUFFSCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0tBQUE7Q0FDSixDQUFDO0FBQ0YsZUFBZSxnQkFBZ0IsQ0FBQyJ9