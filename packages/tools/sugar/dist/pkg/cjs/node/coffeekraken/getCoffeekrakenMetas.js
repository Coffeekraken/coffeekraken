"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("@coffeekraken/sugar/fs");
const path_1 = require("@coffeekraken/sugar/path");
const fs_2 = __importDefault(require("fs"));
const path_2 = __importDefault(require("path"));
const parseSemverString_1 = __importDefault(require("../../shared/version/parseSemverString"));
function getCoffeekrakenMetas() {
    const packageJsonPath = path_2.default.resolve((0, path_1.__packageRootDir)((0, fs_1.__dirname)()), 'package.json');
    if (!fs_2.default.existsSync(packageJsonPath)) {
        throw new Error(`Cannot find the package.json fule to get the coffeekraken metas`);
    }
    const json = (0, fs_1.__readJsonSync)(packageJsonPath);
    return {
        version: (0, parseSemverString_1.default)(json.version),
    };
}
exports.default = getCoffeekrakenMetas;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0NBQW1FO0FBQ25FLG1EQUE0RDtBQUM1RCw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLCtGQUVnRDtBQTBCaEQsU0FBd0Isb0JBQW9CO0lBQ3hDLE1BQU0sZUFBZSxHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQ2xDLElBQUEsdUJBQWdCLEVBQUMsSUFBQSxjQUFTLEdBQUUsQ0FBQyxFQUM3QixjQUFjLENBQ2pCLENBQUM7SUFDRixJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsRUFBRTtRQUNuQyxNQUFNLElBQUksS0FBSyxDQUNYLGlFQUFpRSxDQUNwRSxDQUFDO0tBQ0w7SUFFRCxNQUFNLElBQUksR0FBRyxJQUFBLG1CQUFjLEVBQUMsZUFBZSxDQUFDLENBQUM7SUFFN0MsT0FBTztRQUNILE9BQU8sRUFBRSxJQUFBLDJCQUFtQixFQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7S0FDN0MsQ0FBQztBQUNOLENBQUM7QUFoQkQsdUNBZ0JDIn0=