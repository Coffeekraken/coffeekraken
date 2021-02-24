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
            projectDirectoryUrl
        })
    ], {
        projectDirectoryUrl,
        importMapFileRelativeUrl: './dist/package.importmap'
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0TWFwLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltcG9ydE1hcC5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxNQUFNLEVBQ0osMkJBQTJCLEVBQzNCLDJCQUEyQixFQUM1QixHQUFHLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0FBQzdDLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUVyRSxrQkFBZSxHQUFTLEVBQUU7SUFDeEIsTUFBTSxtQkFBbUIsR0FBRyxhQUFhLEVBQUUsQ0FBQztJQUU1QyxNQUFNLDJCQUEyQixDQUMvQjtRQUNFLDJCQUEyQixDQUFDO1lBQzFCLG1CQUFtQjtTQUNwQixDQUFDO0tBQ0gsRUFDRDtRQUNFLG1CQUFtQjtRQUNuQix3QkFBd0IsRUFBRSwwQkFBMEI7S0FDckQsQ0FDRixDQUFDO0FBQ0osQ0FBQyxDQUFBLENBQUMifQ==