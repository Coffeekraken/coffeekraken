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
const __packageRoot = require('../../node/path/packageRoot').default;
export default () => __awaiter(void 0, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0TWFwLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltcG9ydE1hcC5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsTUFBTSxFQUNKLDJCQUEyQixFQUMzQiwyQkFBMkIsRUFDNUIsR0FBRyxPQUFPLENBQUMsK0JBQStCLENBQUMsQ0FBQztBQUM3QyxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFFckUsZUFBZSxHQUFTLEVBQUU7SUFDeEIsTUFBTSxtQkFBbUIsR0FBRyxhQUFhLEVBQUUsQ0FBQztJQUU1QyxNQUFNLDJCQUEyQixDQUMvQjtRQUNFLDJCQUEyQixDQUFDO1lBQzFCLG1CQUFtQjtZQUNuQixxQ0FBcUMsRUFBRSxJQUFJO1NBQzVDLENBQUM7S0FDSCxFQUNEO1FBQ0UsbUJBQW1CO1FBQ25CLHdCQUF3QixFQUFFLHVCQUF1QjtLQUNsRCxDQUNGLENBQUM7QUFDSixDQUFDLENBQUEsQ0FBQyJ9