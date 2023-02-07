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
        var _a;
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
            const sourceReadmePath = path_2.default.resolve((0, path_1.__packageRootDir)((0, fs_1.__dirname)()), 'src/data/readme/README.md.twig');
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
            (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `<green>[readme]</green> <cyan>${path_2.default.relative((0, path_1.__packageRootDir)(), input)}</cyan> added <green>successfully</green>`);
            return true;
        });
    },
};
exports.default = readmeIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQStEO0FBQy9ELG1EQUE0RDtBQUM1RCw0Q0FBc0I7QUFHdEIsa0ZBQTBEO0FBQzFELGdEQUEwQjtBQUUxQjs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxnQkFBZ0IsR0FBd0I7SUFDMUMsRUFBRSxFQUFFLFFBQVE7SUFDWixXQUFXLEVBQ1AsK0RBQStEO0lBQ25FLFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUM7SUFDNUIsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFOzs7WUFDYixNQUFNLEtBQUssR0FBRyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFDNUMsTUFBTSxHQUFHLHdCQUFjLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBRWpELElBQ0ksWUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQztvQkFDUixJQUFJLEVBQUUsU0FBUztvQkFDZixPQUFPLEVBQ0gsOERBQThEO29CQUNsRSxPQUFPLEVBQUUsSUFBSTtpQkFDaEIsQ0FBQyxDQUFDLEVBQ0w7Z0JBQ0UsT0FBTyxLQUFLLENBQUM7YUFDaEI7WUFFRCxNQUFNLGdCQUFnQixHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQ25DLElBQUEsdUJBQWdCLEVBQUMsSUFBQSxjQUFTLEdBQUUsQ0FBQyxFQUM3QixnQ0FBZ0MsQ0FDbkMsQ0FBQztZQUVGLG9DQUFvQztZQUNwQyxJQUFBLGVBQVUsRUFBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUVwQyx1Q0FBdUM7WUFFdkMsaUNBQWlDO1lBQ2pDLDRDQUE0QztZQUM1Qyx1Q0FBdUM7WUFDdkMsOEJBQThCO1lBQzlCLHlDQUF5QztZQUN6Qyw4QkFBOEI7WUFDOUIsU0FBUztZQUNULGlDQUFpQztZQUNqQyxNQUFNO1lBRU4sTUFBQSxPQUFPLENBQUMsT0FBTyx3REFDWCxpQ0FBaUMsY0FBTSxDQUFDLFFBQVEsQ0FDNUMsSUFBQSx1QkFBZ0IsR0FBRSxFQUNsQixLQUFLLENBQ1IsMkNBQTJDLENBQy9DLENBQUM7WUFFRixPQUFPLElBQUksQ0FBQzs7S0FDZjtDQUNKLENBQUM7QUFDRixrQkFBZSxnQkFBZ0IsQ0FBQyJ9