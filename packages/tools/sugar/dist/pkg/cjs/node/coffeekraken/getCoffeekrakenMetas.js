"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dirname_js_1 = __importDefault(require("../fs/dirname.js"));
const readJsonSync_js_1 = __importDefault(require("../fs/readJsonSync.js"));
const packageRootDir_js_1 = __importDefault(require("../path/packageRootDir.js"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const parseSemverString_js_1 = __importDefault(require("../../shared/version/parseSemverString.js"));
function getCoffeekrakenMetas() {
    const packageJsonPath = path_1.default.resolve((0, packageRootDir_js_1.default)((0, dirname_js_1.default)()), 'package.json');
    if (!fs_1.default.existsSync(packageJsonPath)) {
        throw new Error(`Cannot find the package.json fule to get the coffeekraken metas`);
    }
    const json = (0, readJsonSync_js_1.default)(packageJsonPath);
    return {
        version: (0, parseSemverString_js_1.default)(json.version),
    };
}
exports.default = getCoffeekrakenMetas;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0VBQXlDO0FBQ3pDLDRFQUFtRDtBQUNuRCxrRkFBeUQ7QUFFekQsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQixxR0FFbUQ7QUErQm5ELFNBQXdCLG9CQUFvQjtJQUN4QyxNQUFNLGVBQWUsR0FBRyxjQUFNLENBQUMsT0FBTyxDQUNsQyxJQUFBLDJCQUFnQixFQUFDLElBQUEsb0JBQVMsR0FBRSxDQUFDLEVBQzdCLGNBQWMsQ0FDakIsQ0FBQztJQUNGLElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1FBQ25DLE1BQU0sSUFBSSxLQUFLLENBQ1gsaUVBQWlFLENBQ3BFLENBQUM7S0FDTDtJQUVELE1BQU0sSUFBSSxHQUFHLElBQUEseUJBQWMsRUFBQyxlQUFlLENBQUMsQ0FBQztJQUU3QyxPQUFPO1FBQ0gsT0FBTyxFQUFFLElBQUEsOEJBQW1CLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztLQUM3QyxDQUFDO0FBQ04sQ0FBQztBQWhCRCx1Q0FnQkMifQ==