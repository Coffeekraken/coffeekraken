var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __packagePath from '@coffeekraken/sugar/node/npm/packagePath';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';
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
            const packageRoot = __packageRootDir();
            const cliPackagePath = __packagePath('@coffeekraken/cli');
            if (!cliPackagePath)
                return false;
            let nvmrc;
            if (__fs.existsSync(`${cliPackagePath}/.nvmrc`)) {
                nvmrc = __fs.readFileSync(`${cliPackagePath}/.nvmrc`).toString();
                __fs.writeFileSync(`${packageRoot}/.nvmrc`, nvmrc);
                console.log(`<green>[nvmrc]</green> Default <cyan>.nvmrc</cyan> file addedd <green>successfully</green> with node version <magenta>${nvmrc}</magenta>`);
                return true;
            }
            return false;
        });
    },
};
export default nvmrcIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sYUFBYSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUd0Qjs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBTSxlQUFlLEdBQXdCO0lBQ3pDLEVBQUUsRUFBRSxPQUFPO0lBQ1gsV0FBVyxFQUFFLDREQUE0RDtJQUN6RSxZQUFZLEVBQUUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQztJQUNwQyxHQUFHOztZQUNMLE1BQU0sV0FBVyxHQUFHLGdCQUFnQixFQUFFLENBQUM7WUFFdkMsTUFBTSxjQUFjLEdBQUcsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLGNBQWM7Z0JBQUUsT0FBTyxLQUFLLENBQUM7WUFFbEMsSUFBSSxLQUFLLENBQUM7WUFDVixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxjQUFjLFNBQVMsQ0FBQyxFQUFFO2dCQUM3QyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLGNBQWMsU0FBUyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2pFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxXQUFXLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFFbkQsT0FBTyxDQUFDLEdBQUcsQ0FDUCx5SEFBeUgsS0FBSyxZQUFZLENBQzdJLENBQUM7Z0JBQ0YsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUVELE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7S0FBQTtDQUNKLENBQUM7QUFDRixlQUFlLGVBQWUsQ0FBQyJ9