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
/**
 * @name        sugarJsonIngredient
 * @namespace   node.ingredients.manifest
 * @type        ISKitchenIngredient
 * @static
 *
 * This ingredient represent the "manifest.json" file at the root of your project
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const sugarJsonIngredient = {
    id: 'sugarJson',
    description: 'Add the default <cyan>sugar.json</cyan> in your project',
    projectTypes: ['*'],
    add({ context }) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const packageRoot = (0, path_1.__packageRootDir)();
            if (fs_2.default.existsSync(`${packageRoot}/sugar.json`)) {
                const json = (0, fs_1.__readJsonSync)(`${packageRoot}/sugar.json`);
                json.recipe = (_a = context.recipe) !== null && _a !== void 0 ? _a : 'generic';
                (0, fs_1.__writeJsonSync)(`${packageRoot}/sugar.json`, json);
            }
            else {
                (0, fs_1.__writeJsonSync)(`${packageRoot}/sugar.json`, {
                    recipe: (_b = context.recipe) !== null && _b !== void 0 ? _b : 'generic',
                });
            }
            (_c = console.verbose) === null || _c === void 0 ? void 0 : _c.call(console, `<yellow>[sugarJson]</yellow> "<cyan>sugar.json</cyan>" file added <green>successfully</green> with the recipe <cyan>${(_d = context.recipe) !== null && _d !== void 0 ? _d : 'generic'}</cyan>`);
            return true;
        });
    },
};
exports.default = sugarJsonIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQXlFO0FBQ3pFLG1EQUE0RDtBQUM1RCw0Q0FBc0I7QUFHdEI7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sbUJBQW1CLEdBQXdCO0lBQzdDLEVBQUUsRUFBRSxXQUFXO0lBQ2YsV0FBVyxFQUFFLHlEQUF5RDtJQUN0RSxZQUFZLEVBQUUsQ0FBQyxHQUFHLENBQUM7SUFDYixHQUFHLENBQUMsRUFBRSxPQUFPLEVBQUU7OztZQUNqQixNQUFNLFdBQVcsR0FBRyxJQUFBLHVCQUFnQixHQUFFLENBQUM7WUFFdkMsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsV0FBVyxhQUFhLENBQUMsRUFBRTtnQkFDOUMsTUFBTSxJQUFJLEdBQUcsSUFBQSxtQkFBYyxFQUFDLEdBQUcsV0FBVyxhQUFhLENBQUMsQ0FBQztnQkFDekQsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFBLE9BQU8sQ0FBQyxNQUFNLG1DQUFJLFNBQVMsQ0FBQztnQkFDMUMsSUFBQSxvQkFBZSxFQUFDLEdBQUcsV0FBVyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDdEQ7aUJBQU07Z0JBQ0gsSUFBQSxvQkFBZSxFQUFDLEdBQUcsV0FBVyxhQUFhLEVBQUU7b0JBQ3pDLE1BQU0sRUFBRSxNQUFBLE9BQU8sQ0FBQyxNQUFNLG1DQUFJLFNBQVM7aUJBQ3RDLENBQUMsQ0FBQzthQUNOO1lBRUQsTUFBQSxPQUFPLENBQUMsT0FBTyx3REFDWCx1SEFDSSxNQUFBLE9BQU8sQ0FBQyxNQUFNLG1DQUFJLFNBQ3RCLFNBQVMsQ0FDWixDQUFDO1lBRUYsT0FBTyxJQUFJLENBQUM7O0tBQ2Y7Q0FDSixDQUFDO0FBQ0Ysa0JBQWUsbUJBQW1CLENBQUMifQ==