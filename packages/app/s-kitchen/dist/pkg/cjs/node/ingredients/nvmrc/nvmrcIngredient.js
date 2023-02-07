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
const packagePath_1 = __importDefault(require("@coffeekraken/sugar/node/npm/packagePath"));
const path_1 = require("@coffeekraken/sugar/path");
const fs_1 = __importDefault(require("fs"));
/**
 * @name        nvmrcIngredient
 * @namespace   node.ingredients.nvmrc
 * @type        ISKitchenIngredient
 * @static
 *
 * This ingredient represent the ".nvmrc" file at the root of your project
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const nvmrcIngredient = {
    id: 'nvmrc',
    description: 'Add the default <cyan>.nvmrc</cyan> file into your project',
    projectTypes: ['unknown', 'sugar', 'next'],
    add() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const packageRoot = (0, path_1.__packageRootDir)();
            const cliPackagePath = (0, packagePath_1.default)('@coffeekraken/cli');
            if (!cliPackagePath)
                return false;
            let nvmrc;
            if (fs_1.default.existsSync(`${cliPackagePath}/.nvmrc`)) {
                nvmrc = fs_1.default.readFileSync(`${cliPackagePath}/.nvmrc`).toString();
                fs_1.default.writeFileSync(`${packageRoot}/.nvmrc`, nvmrc);
                (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `<green>[nvmrc]</green> Default <cyan>.nvmrc</cyan> file addedd <green>successfully</green> with node version <magenta>${nvmrc}</magenta>`);
                return true;
            }
            return false;
        });
    },
};
exports.default = nvmrcIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkZBQXFFO0FBQ3JFLG1EQUE0RDtBQUM1RCw0Q0FBc0I7QUFHdEI7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sZUFBZSxHQUF3QjtJQUN6QyxFQUFFLEVBQUUsT0FBTztJQUNYLFdBQVcsRUFBRSw0REFBNEQ7SUFDekUsWUFBWSxFQUFFLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUM7SUFDcEMsR0FBRzs7O1lBQ0wsTUFBTSxXQUFXLEdBQUcsSUFBQSx1QkFBZ0IsR0FBRSxDQUFDO1lBRXZDLE1BQU0sY0FBYyxHQUFHLElBQUEscUJBQWEsRUFBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxjQUFjO2dCQUFFLE9BQU8sS0FBSyxDQUFDO1lBRWxDLElBQUksS0FBSyxDQUFDO1lBQ1YsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsY0FBYyxTQUFTLENBQUMsRUFBRTtnQkFDN0MsS0FBSyxHQUFHLFlBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxjQUFjLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNqRSxZQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsV0FBVyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBRW5ELE1BQUEsT0FBTyxDQUFDLE9BQU8sd0RBQ1gseUhBQXlILEtBQUssWUFBWSxDQUM3SSxDQUFDO2dCQUNGLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7WUFFRCxPQUFPLEtBQUssQ0FBQzs7S0FDaEI7Q0FDSixDQUFDO0FBQ0Ysa0JBQWUsZUFBZSxDQUFDIn0=