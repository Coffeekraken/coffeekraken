var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { getImportMapFromNodeModules, generateImportMapForProject } = require('@jsenv/node-module-import-map');
const __packageRootDir = require('../../node/path/packageRootDir').default;
export default () => __awaiter(void 0, void 0, void 0, function* () {
    const projectDirectoryUrl = __packageRootDir();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0TWFwLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltcG9ydE1hcC5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsTUFBTSxFQUNKLDJCQUEyQixFQUMzQiwyQkFBMkIsRUFDNUIsR0FBRyxPQUFPLENBQUMsK0JBQStCLENBQUMsQ0FBQztBQUM3QyxNQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUUzRSxlQUFlLEdBQVMsRUFBRTtJQUN4QixNQUFNLG1CQUFtQixHQUFHLGdCQUFnQixFQUFFLENBQUM7SUFFL0MsTUFBTSwyQkFBMkIsQ0FDL0I7UUFDRSwyQkFBMkIsQ0FBQztZQUMxQixtQkFBbUI7WUFDbkIscUNBQXFDLEVBQUUsSUFBSTtTQUM1QyxDQUFDO0tBQ0gsRUFDRDtRQUNFLG1CQUFtQjtRQUNuQix3QkFBd0IsRUFBRSx1QkFBdUI7S0FDbEQsQ0FDRixDQUFDO0FBQ0osQ0FBQyxDQUFBLENBQUMifQ==