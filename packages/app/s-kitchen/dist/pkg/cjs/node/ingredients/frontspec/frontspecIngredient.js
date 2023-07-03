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
const s_frontspec_1 = __importDefault(require("@coffeekraken/s-frontspec"));
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
            const frontspec = new s_frontspec_1.default();
            yield frontspec.build();
            (_a = console.verbose) === null || _a === void 0 ? void 0 : _a.call(console, `<green>[frontspec]</green> Default <cyan>frontspec.json</cyan> file addedd <green>successfully</green>`);
            return true;
        });
    },
};
exports.default = frontspecIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNEVBQXFEO0FBR3JEOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLG1CQUFtQixHQUF3QjtJQUM3QyxFQUFFLEVBQUUsV0FBVztJQUNmLFdBQVcsRUFDUCw2RkFBNkY7SUFDakcsWUFBWSxFQUFFLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQztJQUM1QixHQUFHOzs7WUFDTCxNQUFNLFNBQVMsR0FBRyxJQUFJLHFCQUFZLEVBQUUsQ0FBQztZQUNyQyxNQUFNLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUV4QixNQUFBLE9BQU8sQ0FBQyxPQUFPLHdEQUNYLHdHQUF3RyxDQUMzRyxDQUFDO1lBRUYsT0FBTyxJQUFJLENBQUM7O0tBQ2Y7Q0FDSixDQUFDO0FBQ0Ysa0JBQWUsbUJBQW1CLENBQUMifQ==