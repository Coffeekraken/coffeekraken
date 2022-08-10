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
const packagePath_1 = __importDefault(require("@coffeekraken/sugar/node/npm/packagePath"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
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
    add({ ask, log, emit }) {
        return __awaiter(this, void 0, void 0, function* () {
            const packageRoot = (0, packageRoot_1.default)();
            const cliPackagePath = (0, packagePath_1.default)('@coffeekraken/cli');
            if (!cliPackagePath)
                return false;
            let nvmrc;
            if (fs_1.default.existsSync(`${cliPackagePath}/.nvmrc`)) {
                nvmrc = fs_1.default.readFileSync(`${cliPackagePath}/.nvmrc`).toString();
                fs_1.default.writeFileSync(`${packageRoot}/.nvmrc`, nvmrc);
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<green>[nvmrc]</green> Default <cyan>.nvmrc</cyan> file addedd <green>successfully</green> with node version <magenta>${nvmrc}</magenta>`,
                });
                return true;
            }
            return false;
        });
    },
};
exports.default = nvmrcIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQXlDO0FBQ3pDLDJGQUFxRTtBQUNyRSw0RkFBc0U7QUFDdEUsNENBQXNCO0FBR3RCOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLGVBQWUsR0FBd0I7SUFDekMsRUFBRSxFQUFFLE9BQU87SUFDWCxXQUFXLEVBQUUsNERBQTREO0lBQ3pFLFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO0lBQ3BDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFOztZQUN4QixNQUFNLFdBQVcsR0FBRyxJQUFBLHFCQUFhLEdBQUUsQ0FBQztZQUVwQyxNQUFNLGNBQWMsR0FBRyxJQUFBLHFCQUFhLEVBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsY0FBYztnQkFBRSxPQUFPLEtBQUssQ0FBQztZQUVsQyxJQUFJLEtBQUssQ0FBQztZQUNWLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLGNBQWMsU0FBUyxDQUFDLEVBQUU7Z0JBQzdDLEtBQUssR0FBRyxZQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsY0FBYyxTQUFTLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDakUsWUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLFdBQVcsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUVuRCxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLElBQUksRUFBRSxlQUFNLENBQUMsU0FBUztvQkFDdEIsS0FBSyxFQUFFLHlIQUF5SCxLQUFLLFlBQVk7aUJBQ3BKLENBQUMsQ0FBQztnQkFDSCxPQUFPLElBQUksQ0FBQzthQUNmO1lBRUQsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztLQUFBO0NBQ0osQ0FBQztBQUNGLGtCQUFlLGVBQWUsQ0FBQyJ9