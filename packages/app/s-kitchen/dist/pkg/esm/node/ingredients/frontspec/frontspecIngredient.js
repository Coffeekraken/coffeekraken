var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SFrontspec from '@coffeekraken/s-frontspec';
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
    add() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const frontspec = new __SFrontspec();
            yield frontspec.build();
            (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `<green>[frontspec]</green> Default <cyan>frontspec.json</cyan> file addedd <green>successfully</green>`);
            return true;
        });
    },
};
export default frontspecIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBR3JEOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLG1CQUFtQixHQUF3QjtJQUM3QyxFQUFFLEVBQUUsV0FBVztJQUNmLFdBQVcsRUFDUCw2RkFBNkY7SUFDakcsWUFBWSxFQUFFLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQztJQUM1QixHQUFHOzs7WUFDTCxNQUFNLFNBQVMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1lBQ3JDLE1BQU0sU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRXhCLE1BQUEsT0FBTyxDQUFDLE9BQU8sd0RBQ1gsd0dBQXdHLENBQzNHLENBQUM7WUFFRixPQUFPLElBQUksQ0FBQzs7S0FDZjtDQUNKLENBQUM7QUFDRixlQUFlLG1CQUFtQixDQUFDIn0=