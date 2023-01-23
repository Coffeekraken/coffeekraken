"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("@coffeekraken/sugar/fs");
const path_1 = require("@coffeekraken/sugar/path");
const fs_2 = __importDefault(require("fs"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const path_2 = __importDefault(require("path"));
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
        return __awaiter(this, void 0, void 0, function* () {
            const input = s_sugar_config_1.default.get('readme.input'), output = s_sugar_config_1.default.get('readme.output');
            if (fs_2.default.existsSync(input) &&
                !(yield ask({
                    type: 'confirm',
                    message: 'A README file already exists. Would you like to override it?',
                    default: true,
                }))) {
                return false;
            }
            const sourceReadmePath = path_2.default.resolve((0, path_1.__packageRootDir)((0, fs_1.__dirname)()), 'src/data/readme/README.md');
            // copy the file to the project root
            (0, fs_1.__copySync)(sourceReadmePath, input);
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
            console.log(`<green>[readme]</green> <cyan>${path_2.default.relative((0, path_1.__packageRootDir)(), input)}</cyan> added <green>successfully</green>`);
            return true;
        });
    },
};
exports.default = readmeIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQStEO0FBQy9ELG1EQUE0RDtBQUM1RCw0Q0FBc0I7QUFHdEIsa0ZBQTBEO0FBQzFELGdEQUEwQjtBQUUxQjs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxnQkFBZ0IsR0FBd0I7SUFDMUMsRUFBRSxFQUFFLFFBQVE7SUFDWixXQUFXLEVBQ1AsK0RBQStEO0lBQ25FLFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUM7SUFDNUIsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFOztZQUNiLE1BQU0sS0FBSyxHQUFHLHdCQUFjLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxFQUM1QyxNQUFNLEdBQUcsd0JBQWMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7WUFFakQsSUFDSSxZQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztnQkFDdEIsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDO29CQUNSLElBQUksRUFBRSxTQUFTO29CQUNmLE9BQU8sRUFDSCw4REFBOEQ7b0JBQ2xFLE9BQU8sRUFBRSxJQUFJO2lCQUNoQixDQUFDLENBQUMsRUFDTDtnQkFDRSxPQUFPLEtBQUssQ0FBQzthQUNoQjtZQUVELE1BQU0sZ0JBQWdCLEdBQUcsY0FBTSxDQUFDLE9BQU8sQ0FDbkMsSUFBQSx1QkFBZ0IsRUFBQyxJQUFBLGNBQVMsR0FBRSxDQUFDLEVBQzdCLDJCQUEyQixDQUM5QixDQUFDO1lBRUYsb0NBQW9DO1lBQ3BDLElBQUEsZUFBVSxFQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRXBDLHVDQUF1QztZQUV2QyxpQ0FBaUM7WUFDakMsNENBQTRDO1lBQzVDLHVDQUF1QztZQUN2Qyw4QkFBOEI7WUFDOUIseUNBQXlDO1lBQ3pDLDhCQUE4QjtZQUM5QixTQUFTO1lBQ1QsaUNBQWlDO1lBQ2pDLE1BQU07WUFFTixPQUFPLENBQUMsR0FBRyxDQUNQLGlDQUFpQyxjQUFNLENBQUMsUUFBUSxDQUM1QyxJQUFBLHVCQUFnQixHQUFFLEVBQ2xCLEtBQUssQ0FDUiwyQ0FBMkMsQ0FDL0MsQ0FBQztZQUVGLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtDQUNKLENBQUM7QUFDRixrQkFBZSxnQkFBZ0IsQ0FBQyJ9