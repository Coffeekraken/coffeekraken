"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const uniqid_1 = __importDefault(require("../../node/string/uniqid"));
const packageTmpDir_1 = __importDefault(require("../path/packageTmpDir"));
const writeFileSync_1 = __importDefault(require("./writeFileSync"));
function __writeTmpFileSync(data, settings = {}) {
    var _a;
    settings = Object.assign({ path: undefined }, settings);
    let path = path_1.default.resolve((0, packageTmpDir_1.default)(), 'files', (_a = settings.path) !== null && _a !== void 0 ? _a : (0, uniqid_1.default)() + '.tmp');
    (0, writeFileSync_1.default)(path, data);
    return path;
}
exports.default = __writeTmpFileSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGdEQUEwQjtBQUMxQixzRUFBZ0Q7QUFDaEQsMEVBQW9EO0FBQ3BELG9FQUE4QztBQW1DOUMsU0FBd0Isa0JBQWtCLENBQ3RDLElBQUksRUFDSixXQUErQyxFQUFFOztJQUVqRCxRQUFRLG1CQUNKLElBQUksRUFBRSxTQUFTLElBQ1osUUFBUSxDQUNkLENBQUM7SUFFRixJQUFJLElBQUksR0FBRyxjQUFNLENBQUMsT0FBTyxDQUNyQixJQUFBLHVCQUFlLEdBQUUsRUFDakIsT0FBTyxFQUNQLE1BQUEsUUFBUSxDQUFDLElBQUksbUNBQUksSUFBQSxnQkFBUSxHQUFFLEdBQUcsTUFBTSxDQUN2QyxDQUFDO0lBQ0YsSUFBQSx1QkFBZSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBaEJELHFDQWdCQyJ9