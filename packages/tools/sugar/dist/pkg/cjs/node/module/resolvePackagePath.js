"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolve_package_path_1 = __importDefault(require("resolve-package-path"));
const packageRootDir_js_1 = __importDefault(require("../path/packageRootDir.js"));
function resolvePackagePath(pkg, settings) {
    var _a;
    const finalSettings = Object.assign({ nodeModulesDir: `${(0, packageRootDir_js_1.default)()}/node_modules` }, (settings !== null && settings !== void 0 ? settings : {}));
    return (_a = (0, resolve_package_path_1.default)(pkg, finalSettings.nodeModulesDir)) === null || _a === void 0 ? void 0 : _a.replace(/\/package\.json$/, '');
}
exports.default = resolvePackagePath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0ZBQXdEO0FBRXhELGtGQUF5RDtBQThCekQsU0FBd0Isa0JBQWtCLENBQ3RDLEdBQVcsRUFDWCxRQUErQzs7SUFFL0MsTUFBTSxhQUFhLG1CQUNmLGNBQWMsRUFBRSxHQUFHLElBQUEsMkJBQWdCLEdBQUUsZUFBZSxJQUNqRCxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO0lBQ0YsT0FBTyxNQUFBLElBQUEsOEJBQW9CLEVBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxjQUFjLENBQUMsMENBQUUsT0FBTyxDQUNuRSxrQkFBa0IsRUFDbEIsRUFBRSxDQUNMLENBQUM7QUFDTixDQUFDO0FBWkQscUNBWUMifQ==