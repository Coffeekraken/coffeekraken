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
const copySync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/copySync"));
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const fs_1 = __importDefault(require("fs"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const path_1 = __importDefault(require("path"));
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
            const input = s_sugar_config_1.default.get('readme.input'), output = s_sugar_config_1.default.get('readme.output');
            if (fs_1.default.existsSync(input) &&
                !(yield ask({
                    type: 'confirm',
                    message: 'A README file already exists. Would you like to override it?',
                    default: true,
                }))) {
                return false;
            }
            const sourceReadmePath = path_1.default.resolve((0, packageRoot_1.default)((0, dirname_1.default)()), 'src/data/readme/README.md');
            // copy the file to the project root
            (0, copySync_1.default)(sourceReadmePath, input);
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
                value: `<green>[readme]</green> <cyan>${path_1.default.relative((0, packageRoot_1.default)(), input)}</cyan> added <green>successfully</green>`,
            });
            return true;
        });
    },
};
exports.default = readmeIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0ZBQThEO0FBQzlELGtGQUE0RDtBQUM1RCw0RkFBc0U7QUFDdEUsNENBQXNCO0FBR3RCLGtGQUEwRDtBQUMxRCxnREFBMEI7QUFFMUI7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sZ0JBQWdCLEdBQXdCO0lBQzFDLEVBQUUsRUFBRSxRQUFRO0lBQ1osV0FBVyxFQUNQLCtEQUErRDtJQUNuRSxZQUFZLEVBQUUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDO0lBQzVCLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFOztZQUN4QixNQUFNLEtBQUssR0FBRyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFDNUMsTUFBTSxHQUFHLHdCQUFjLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBRWpELElBQ0ksWUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQztvQkFDUixJQUFJLEVBQUUsU0FBUztvQkFDZixPQUFPLEVBQ0gsOERBQThEO29CQUNsRSxPQUFPLEVBQUUsSUFBSTtpQkFDaEIsQ0FBQyxDQUFDLEVBQ0w7Z0JBQ0UsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFFRCxNQUFNLGdCQUFnQixHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQ25DLElBQUEscUJBQWEsRUFBQyxJQUFBLGlCQUFTLEdBQUUsQ0FBQyxFQUMxQiwyQkFBMkIsQ0FDOUIsQ0FBQztZQUVGLG9DQUFvQztZQUNwQyxJQUFBLGtCQUFVLEVBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFFcEMsdUNBQXVDO1lBRXZDLGlDQUFpQztZQUNqQyw0Q0FBNEM7WUFDNUMsdUNBQXVDO1lBQ3ZDLDhCQUE4QjtZQUM5QixzQ0FBc0M7WUFDdEMsOEJBQThCO1lBQzlCLFNBQVM7WUFDVCxpQ0FBaUM7WUFDakMsTUFBTTtZQUVOLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLGlDQUFpQyxjQUFNLENBQUMsUUFBUSxDQUNuRCxJQUFBLHFCQUFhLEdBQUUsRUFDZixLQUFLLENBQ1IsMkNBQTJDO2FBQy9DLENBQUMsQ0FBQztZQUVILE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtDQUNKLENBQUM7QUFDRixrQkFBZSxnQkFBZ0IsQ0FBQyJ9