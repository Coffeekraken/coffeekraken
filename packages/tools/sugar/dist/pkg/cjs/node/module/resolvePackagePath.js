"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolve_package_path_1 = __importDefault(require("resolve-package-path"));
const packageRootDir_1 = __importDefault(require("../path/packageRootDir"));
function resolvePackagePath(pkg, settings) {
    var _a;
    const finalSettings = Object.assign({ nodeModulesDir: `${(0, packageRootDir_1.default)()}/node_modules` }, settings !== null && settings !== void 0 ? settings : {});
    return (_a = (0, resolve_package_path_1.default)(pkg, finalSettings.nodeModulesDir)) === null || _a === void 0 ? void 0 : _a.replace(/\/package\.json$/, '');
}
exports.default = resolvePackagePath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsZ0ZBQXdEO0FBRXhELDRFQUFzRDtBQThCdEQsU0FBd0Isa0JBQWtCLENBQ3RDLEdBQVcsRUFDWCxRQUErQzs7SUFFL0MsTUFBTSxhQUFhLG1CQUNmLGNBQWMsRUFBRSxHQUFHLElBQUEsd0JBQWdCLEdBQUUsZUFBZSxJQUNqRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ3BCLENBQUE7SUFDRCxPQUFPLE1BQUEsSUFBQSw4QkFBb0IsRUFBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLGNBQWMsQ0FBQywwQ0FBRSxPQUFPLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDcEcsQ0FBQztBQVRELHFDQVNDIn0=