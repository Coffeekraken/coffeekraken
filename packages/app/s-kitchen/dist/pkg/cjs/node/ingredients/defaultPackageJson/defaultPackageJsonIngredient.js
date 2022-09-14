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
const object_1 = require("@coffeekraken/sugar/object");
const path_1 = require("@coffeekraken/sugar/path");
const fs_1 = __importDefault(require("fs"));
/**
 * @name        defaultPackageJsonIngredient
 * @namespace   node.ingredients.defaultPackageJson
 * @type        ISKitchenIngredient
 * @static
 *
 * This ingredient represent the default package.json scripts, dependencies, etc...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const defaultPackageJsonIngredient = {
    id: 'defaultPackageJson',
    description: 'Apply the <yellow>config.package.defaultPackageJson</yellow> object on your <cyan>package.json</cyan> file',
    projectTypes: ['unknown', 'sugar'],
    add({ ask, log, emit, context }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const packageRoot = (0, path_1.__packageRootDir)();
            let json = {};
            if (fs_1.default.existsSync(`${packageRoot}/package.json`)) {
                json = JSON.parse(fs_1.default.readFileSync(`${packageRoot}/package.json`).toString());
            }
            json = (0, object_1.__deepMerge)(json, (_a = s_sugar_config_1.default.get('package.defaultPackageJson')) !== null && _a !== void 0 ? _a : {});
            fs_1.default.writeFileSync(`${packageRoot}/package.json`, JSON.stringify(json, null, 4));
            return true;
        });
    },
};
exports.default = defaultPackageJsonIngredient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBRUEsa0ZBQTBEO0FBQzFELHVEQUF5RDtBQUN6RCxtREFBNEQ7QUFDNUQsNENBQXNCO0FBRXRCOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLDRCQUE0QixHQUF3QjtJQUN0RCxFQUFFLEVBQUUsb0JBQW9CO0lBQ3hCLFdBQVcsRUFDUCw0R0FBNEc7SUFDaEgsWUFBWSxFQUFFLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQztJQUM1QixHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7OztZQUNqQyxNQUFNLFdBQVcsR0FBRyxJQUFBLHVCQUFnQixHQUFFLENBQUM7WUFFdkMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ2QsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsV0FBVyxlQUFlLENBQUMsRUFBRTtnQkFDaEQsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQ2IsWUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLFdBQVcsZUFBZSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQzlELENBQUM7YUFDTDtZQUNELElBQUksR0FBRyxJQUFBLG9CQUFXLEVBQ2QsSUFBSSxFQUNKLE1BQUEsd0JBQWMsQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsbUNBQUksRUFBRSxDQUN6RCxDQUFDO1lBQ0YsWUFBSSxDQUFDLGFBQWEsQ0FDZCxHQUFHLFdBQVcsZUFBZSxFQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQ2hDLENBQUM7WUFFRixPQUFPLElBQUksQ0FBQzs7S0FDZjtDQUNKLENBQUM7QUFDRixrQkFBZSw0QkFBNEIsQ0FBQyJ9