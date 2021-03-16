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
Object.defineProperty(exports, "__esModule", { value: true });
const { getImportMapFromNodeModules, generateImportMapForProject } = require('@jsenv/node-module-import-map');
const __packageRoot = require('../../node/path/packageRoot').default;
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    const projectDirectoryUrl = __packageRoot();
    yield generateImportMapForProject([
        getImportMapFromNodeModules({
            projectDirectoryUrl,
            projectPackageDevDependenciesIncluded: true
        })
    ], {
        projectDirectoryUrl,
        importMapFileRelativeUrl: './dist/importmap.json'
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0TWFwLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGkvanMvaW1wb3J0TWFwLmNsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLE1BQU0sRUFDSiwyQkFBMkIsRUFDM0IsMkJBQTJCLEVBQzVCLEdBQUcsT0FBTyxDQUFDLCtCQUErQixDQUFDLENBQUM7QUFDN0MsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUMsT0FBTyxDQUFDO0FBRXJFLGtCQUFlLEdBQVMsRUFBRTtJQUN4QixNQUFNLG1CQUFtQixHQUFHLGFBQWEsRUFBRSxDQUFDO0lBRTVDLE1BQU0sMkJBQTJCLENBQy9CO1FBQ0UsMkJBQTJCLENBQUM7WUFDMUIsbUJBQW1CO1lBQ25CLHFDQUFxQyxFQUFFLElBQUk7U0FDNUMsQ0FBQztLQUNILEVBQ0Q7UUFDRSxtQkFBbUI7UUFDbkIsd0JBQXdCLEVBQUUsdUJBQXVCO0tBQ2xELENBQ0YsQ0FBQztBQUNKLENBQUMsQ0FBQSxDQUFDIn0=