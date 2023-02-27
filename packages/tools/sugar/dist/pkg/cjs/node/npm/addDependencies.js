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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const package_1 = require("@coffeekraken/sugar/package");
const path_1 = require("@coffeekraken/sugar/path");
const fs_1 = __importDefault(require("fs"));
function addDependencies(dependencies, settings) {
    return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
        settings = Object.assign({ cwd: process.cwd() }, settings);
        const packageJson = (0, package_1.__packageJsonSync)(settings.cwd), packageJsonPath = `${(0, path_1.__packageRootDir)(settings.cwd)}/package.json`;
        if (settings.dev) {
            if (!packageJson.devDependencies) {
                packageJson.devDependencies = dependencies;
            }
            else {
                packageJson.devDependencies = Object.assign(Object.assign({}, packageJson.devDependencies), dependencies);
            }
        }
        else {
            if (!packageJson.dependencies) {
                packageJson.dependencies = dependencies;
            }
            else {
                packageJson.dependencies = Object.assign(Object.assign({}, packageJson.dependencies), dependencies);
            }
        }
        // save the file back
        fs_1.default.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4));
        resolve(packageJson);
    }));
}
exports.default = addDependencies;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEseURBQWdFO0FBQ2hFLG1EQUE0RDtBQUM1RCw0Q0FBc0I7QUFtQ3RCLFNBQXdCLGVBQWUsQ0FDbkMsWUFBb0MsRUFDcEMsUUFBOEM7SUFFOUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO1FBQ2pDLFFBQVEsbUJBQ0osR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFDZixRQUFRLENBQ2QsQ0FBQztRQUVGLE1BQU0sV0FBVyxHQUFHLElBQUEsMkJBQWlCLEVBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUMvQyxlQUFlLEdBQUcsR0FBRyxJQUFBLHVCQUFnQixFQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO1FBRXZFLElBQUksUUFBUSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFO2dCQUM5QixXQUFXLENBQUMsZUFBZSxHQUFHLFlBQVksQ0FBQzthQUM5QztpQkFBTTtnQkFDSCxXQUFXLENBQUMsZUFBZSxtQ0FDcEIsV0FBVyxDQUFDLGVBQWUsR0FDM0IsWUFBWSxDQUNsQixDQUFDO2FBQ0w7U0FDSjthQUFNO1lBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUU7Z0JBQzNCLFdBQVcsQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO2FBQzNDO2lCQUFNO2dCQUNILFdBQVcsQ0FBQyxZQUFZLG1DQUNqQixXQUFXLENBQUMsWUFBWSxHQUN4QixZQUFZLENBQ2xCLENBQUM7YUFDTDtTQUNKO1FBRUQscUJBQXFCO1FBQ3JCLFlBQUksQ0FBQyxhQUFhLENBQ2QsZUFBZSxFQUNmLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FDdkMsQ0FBQztRQUVGLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN6QixDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQXpDRCxrQ0F5Q0MifQ==