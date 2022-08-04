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
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const copySync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/copySync"));
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const path_1 = __importDefault(require("path"));
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
            const sourceFilePath = path_1.default.resolve((0, packageRoot_1.default)((0, dirname_1.default)()), `src/data/favicon/favicon.png`);
            const output = s_sugar_config_1.default.get('faviconBuilder.input');
            // copy the file to his destination
            (0, copySync_1.default)(sourceFilePath, output);
            return true;
        });
    },
};
exports.default = faviconIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0ZBQTBEO0FBQzFELG9GQUE4RDtBQUM5RCxrRkFBNEQ7QUFDNUQsNEZBQXNFO0FBQ3RFLGdEQUEwQjtBQUcxQjs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxpQkFBaUIsR0FBd0I7SUFDM0MsRUFBRSxFQUFFLFNBQVM7SUFDYixXQUFXLEVBQ1AsdUZBQXVGO0lBQzNGLFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUM7SUFDNUIsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7O1lBQ3hCLG1CQUFtQjtZQUNuQixNQUFNLGNBQWMsR0FBRyxjQUFNLENBQUMsT0FBTyxDQUNqQyxJQUFBLHFCQUFhLEVBQUMsSUFBQSxpQkFBUyxHQUFFLENBQUMsRUFDMUIsOEJBQThCLENBQ2pDLENBQUM7WUFFRixNQUFNLE1BQU0sR0FBRyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBRTFELG1DQUFtQztZQUNuQyxJQUFBLGtCQUFVLEVBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRW5DLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtDQUNKLENBQUM7QUFDRixrQkFBZSxpQkFBaUIsQ0FBQyJ9