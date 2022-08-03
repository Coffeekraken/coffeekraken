"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const parseSemverString_1 = __importDefault(require("../../shared/semver/parseSemverString"));
const dirname_1 = __importDefault(require("../fs/dirname"));
const readJsonSync_1 = __importDefault(require("../fs/readJsonSync"));
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
function getCoffeekrakenMetas() {
    const packageJsonPath = path_1.default.resolve((0, packageRoot_1.default)((0, dirname_1.default)()), 'package.json');
    if (!fs_1.default.existsSync(packageJsonPath)) {
        throw new Error(`Cannot find the package.json fule to get the coffeekraken metas`);
    }
    const json = (0, readJsonSync_1.default)(packageJsonPath);
    return {
        version: (0, parseSemverString_1.default)(json.version),
    };
}
exports.default = getCoffeekrakenMetas;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQiw4RkFFK0M7QUFDL0MsNERBQXNDO0FBQ3RDLHNFQUFnRDtBQUNoRCxzRUFBZ0Q7QUEwQmhELFNBQXdCLG9CQUFvQjtJQUN4QyxNQUFNLGVBQWUsR0FBRyxjQUFNLENBQUMsT0FBTyxDQUNsQyxJQUFBLHFCQUFhLEVBQUMsSUFBQSxpQkFBUyxHQUFFLENBQUMsRUFDMUIsY0FBYyxDQUNqQixDQUFDO0lBQ0YsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLEVBQUU7UUFDbkMsTUFBTSxJQUFJLEtBQUssQ0FDWCxpRUFBaUUsQ0FDcEUsQ0FBQztLQUNMO0lBRUQsTUFBTSxJQUFJLEdBQUcsSUFBQSxzQkFBYyxFQUFDLGVBQWUsQ0FBQyxDQUFDO0lBRTdDLE9BQU87UUFDSCxPQUFPLEVBQUUsSUFBQSwyQkFBbUIsRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0tBQzdDLENBQUM7QUFDTixDQUFDO0FBaEJELHVDQWdCQyJ9