"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const uniqid_js_1 = __importDefault(require("../../node/string/uniqid.js"));
const packageTmpDir_js_1 = __importDefault(require("../path/packageTmpDir.js"));
const writeFileSync_js_1 = __importDefault(require("./writeFileSync.js"));
function __writeTmpFileSync(data, settings = {}) {
    var _a;
    settings = Object.assign({ path: undefined }, settings);
    let path = path_1.default.resolve((0, packageTmpDir_js_1.default)(), 'files', (_a = settings.path) !== null && _a !== void 0 ? _a : (0, uniqid_js_1.default)() + '.tmp');
    (0, writeFileSync_js_1.default)(path, data);
    return path;
}
exports.default = __writeTmpFileSync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGdEQUEwQjtBQUMxQiw0RUFBbUQ7QUFDbkQsZ0ZBQXVEO0FBQ3ZELDBFQUFpRDtBQW1DakQsU0FBd0Isa0JBQWtCLENBQ3RDLElBQUksRUFDSixXQUErQyxFQUFFOztJQUVqRCxRQUFRLG1CQUNKLElBQUksRUFBRSxTQUFTLElBQ1osUUFBUSxDQUNkLENBQUM7SUFFRixJQUFJLElBQUksR0FBRyxjQUFNLENBQUMsT0FBTyxDQUNyQixJQUFBLDBCQUFlLEdBQUUsRUFDakIsT0FBTyxFQUNQLE1BQUEsUUFBUSxDQUFDLElBQUksbUNBQUksSUFBQSxtQkFBUSxHQUFFLEdBQUcsTUFBTSxDQUN2QyxDQUFDO0lBQ0YsSUFBQSwwQkFBZSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBaEJELHFDQWdCQyJ9