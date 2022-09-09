"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const parseSemverString_1 = __importDefault(require("../../shared/semver/parseSemverString"));
const fs_2 = require("@coffeekraken/sugar/fs");
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
function getCoffeekrakenMetas() {
    const packageJsonPath = path_1.default.resolve((0, packageRoot_1.default)((0, fs_2.__dirname)()), 'package.json');
    if (!fs_1.default.existsSync(packageJsonPath)) {
        throw new Error(`Cannot find the package.json fule to get the coffeekraken metas`);
    }
    const json = (0, fs_2.__readJsonSync)(packageJsonPath);
    return {
        version: (0, parseSemverString_1.default)(json.version),
    };
}
exports.default = getCoffeekrakenMetas;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQiw4RkFFK0M7QUFDL0MsK0NBQW1FO0FBQ25FLHNFQUFnRDtBQTBCaEQsU0FBd0Isb0JBQW9CO0lBQ3hDLE1BQU0sZUFBZSxHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQ2xDLElBQUEscUJBQWEsRUFBQyxJQUFBLGNBQVMsR0FBRSxDQUFDLEVBQzFCLGNBQWMsQ0FDakIsQ0FBQztJQUNGLElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1FBQ25DLE1BQU0sSUFBSSxLQUFLLENBQ1gsaUVBQWlFLENBQ3BFLENBQUM7S0FDTDtJQUVELE1BQU0sSUFBSSxHQUFHLElBQUEsbUJBQWMsRUFBQyxlQUFlLENBQUMsQ0FBQztJQUU3QyxPQUFPO1FBQ0gsT0FBTyxFQUFFLElBQUEsMkJBQW1CLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztLQUM3QyxDQUFDO0FBQ04sQ0FBQztBQWhCRCx1Q0FnQkMifQ==