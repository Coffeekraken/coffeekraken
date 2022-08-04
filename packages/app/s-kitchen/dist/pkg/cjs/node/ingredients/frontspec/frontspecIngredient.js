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
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const copySync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/copySync"));
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const path_1 = __importDefault(require("path"));
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
            const frontspecPath = `${(0, packageRoot_1.default)()}/frontspec.json`;
            const sourceJsonPath = path_1.default.resolve((0, packageRoot_1.default)((0, dirname_1.default)()), 'src/data/frontspec/frontspec.json');
            // copy the file to the project root
            (0, copySync_1.default)(sourceJsonPath, frontspecPath);
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<green>[frontspec]</green> Default <cyan>frontspec.json</cyan> file addedd <green>successfully</green>`,
            });
            return true;
        });
    },
};
exports.default = frontspecIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQXlDO0FBQ3pDLG9GQUE4RDtBQUM5RCxrRkFBNEQ7QUFDNUQsNEZBQXNFO0FBQ3RFLGdEQUEwQjtBQUcxQjs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxtQkFBbUIsR0FBd0I7SUFDN0MsRUFBRSxFQUFFLFdBQVc7SUFDZixXQUFXLEVBQ1AsNkZBQTZGO0lBQ2pHLFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUM7SUFDNUIsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUU7O1lBQ3hCLE1BQU0sYUFBYSxHQUFHLEdBQUcsSUFBQSxxQkFBYSxHQUFFLGlCQUFpQixDQUFDO1lBQzFELE1BQU0sY0FBYyxHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQ2pDLElBQUEscUJBQWEsRUFBQyxJQUFBLGlCQUFTLEdBQUUsQ0FBQyxFQUMxQixtQ0FBbUMsQ0FDdEMsQ0FBQztZQUVGLG9DQUFvQztZQUNwQyxJQUFBLGtCQUFVLEVBQUMsY0FBYyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBRTFDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLGVBQU0sQ0FBQyxTQUFTO2dCQUN0QixLQUFLLEVBQUUsd0dBQXdHO2FBQ2xILENBQUMsQ0FBQztZQUVILE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtDQUNKLENBQUM7QUFDRixrQkFBZSxtQkFBbUIsQ0FBQyJ9