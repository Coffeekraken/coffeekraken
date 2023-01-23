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
        return __awaiter(this, void 0, void 0, function* () {
            const packageRoot = (0, path_1.__packageRootDir)();
            const cliPackagePath = (0, packagePath_1.default)('@coffeekraken/cli');
            if (!cliPackagePath)
                return false;
            let nvmrc;
            if (fs_1.default.existsSync(`${cliPackagePath}/.nvmrc`)) {
                nvmrc = fs_1.default.readFileSync(`${cliPackagePath}/.nvmrc`).toString();
                fs_1.default.writeFileSync(`${packageRoot}/.nvmrc`, nvmrc);
                console.log(`<green>[nvmrc]</green> Default <cyan>.nvmrc</cyan> file addedd <green>successfully</green> with node version <magenta>${nvmrc}</magenta>`);
                return true;
            }
            return false;
        });
    },
};
exports.default = nvmrcIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkZBQXFFO0FBQ3JFLG1EQUE0RDtBQUM1RCw0Q0FBc0I7QUFHdEI7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sZUFBZSxHQUF3QjtJQUN6QyxFQUFFLEVBQUUsT0FBTztJQUNYLFdBQVcsRUFBRSw0REFBNEQ7SUFDekUsWUFBWSxFQUFFLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUM7SUFDcEMsR0FBRzs7WUFDTCxNQUFNLFdBQVcsR0FBRyxJQUFBLHVCQUFnQixHQUFFLENBQUM7WUFFdkMsTUFBTSxjQUFjLEdBQUcsSUFBQSxxQkFBYSxFQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLGNBQWM7Z0JBQUUsT0FBTyxLQUFLLENBQUM7WUFFbEMsSUFBSSxLQUFLLENBQUM7WUFDVixJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxjQUFjLFNBQVMsQ0FBQyxFQUFFO2dCQUM3QyxLQUFLLEdBQUcsWUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLGNBQWMsU0FBUyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2pFLFlBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxXQUFXLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFFbkQsT0FBTyxDQUFDLEdBQUcsQ0FDUCx5SEFBeUgsS0FBSyxZQUFZLENBQzdJLENBQUM7Z0JBQ0YsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUVELE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7S0FBQTtDQUNKLENBQUM7QUFDRixrQkFBZSxlQUFlLENBQUMifQ==