// @ts-nocheck
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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../node/cli/parseArgs", "./interface/SNpmBinCliInterface", "child_process", "../../node/path/packageRootDir", "fs", "path", "../../node/monorepo/findPackages"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const parseArgs_1 = __importDefault(require("../../node/cli/parseArgs"));
    const SNpmBinCliInterface_1 = __importDefault(require("./interface/SNpmBinCliInterface"));
    const child_process_1 = __importDefault(require("child_process"));
    const packageRootDir_1 = __importDefault(require("../../node/path/packageRootDir"));
    const fs_1 = __importDefault(require("fs"));
    const path_1 = __importDefault(require("path"));
    const findPackages_1 = __importDefault(require("../../node/monorepo/findPackages"));
    function bin(stringArgs = '') {
        return __awaiter(this, void 0, void 0, function* () {
            const argsObj = (0, parseArgs_1.default)(stringArgs, {
                definition: SNpmBinCliInterface_1.default.definition
            });
            const binCommand = `npm bin ${argsObj.global ? '-g' : ''}`;
            const binFolderPath = child_process_1.default.execSync(binCommand).toString();
            let packagePath;
            if (!argsObj.package) {
                packagePath = (0, packageRootDir_1.default)();
                if (!fs_1.default.existsSync(`${packagePath}/package.json`)) {
                    throw "Sorry but you're not in any package folder to take the bin from...";
                }
            }
            else {
                const packagesObj = yield (0, findPackages_1.default)();
                let packageJson;
                for (let i = 0; i < Object.keys(packagesObj).length; i++) {
                    const json = packagesObj[Object.keys(packagesObj)[i]];
                    if (json.name === argsObj.package) {
                        packageJson = json;
                        packageJson.absolutePath = path_1.default.resolve(process.cwd(), Object.keys(packagesObj)[i]);
                        break;
                    }
                }
                console.log(argsObj);
                if (!packageJson)
                    throw `Sorry but no package has been found with the name "<yellow>${argsObj.package}</yellow>"...`;
                // check for bins
                if (!packageJson.bin)
                    throw `Sorry but the package named "<yellow>${packageJson.name}</yellow>" does not have any bin's to install...`;
                Object.keys(packageJson.bin).forEach((binName) => {
                    const binPath = packageJson.bin[binName];
                    const binAbsolutePath = path_1.default.resolve(packageJson.absolutePath, binPath);
                    switch (argsObj.action) {
                        case 'i':
                        case 'install':
                            const symlinkCommand = `cd ${binFolderPath} && rm -rf ${binFolderPath}/${binName} && ln -s ${path_1.default.relative(binFolderPath, binAbsolutePath)} ${binName}`;
                            console.log(`The "<yellow>${binName}</yellow>" bin from the package "<cyan>${packageJson.name}</cyan>" has been successfully installed ${argsObj.global ? '<magenta>globaly</magenta>' : ''}`);
                            child_process_1.default.spawnSync(symlinkCommand, [], {
                                shell: true
                            });
                            // _fs.symlinkSync(binAbsolutePath, `${binFolderPath}/${binName}`);
                            break;
                        case 'u':
                        case 'un':
                        case 'uninstall':
                            console.log(`The "<yellow>${binName}</yellow>" bin from the package "<cyan>${packageJson.name}</cyan>" has been successfully uninstalled ${argsObj.global ? '<magenta>globaly</magenta>' : ''}`);
                            // _childProcess.execSync(`rm -rf ${binAbsolutePath}/${binName}`, {
                            //   shell: true
                            // });
                            break;
                    }
                });
            }
        });
    }
    exports.default = bin;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJpbi5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWQseUVBQWtEO0lBQ2xELDBGQUFtRTtJQUNuRSxrRUFBMEM7SUFDMUMsb0ZBQThEO0lBRTlELDRDQUFxQjtJQUNyQixnREFBeUI7SUFDekIsb0ZBQTZEO0lBRTdELFNBQThCLEdBQUcsQ0FBQyxVQUFVLEdBQUcsRUFBRTs7WUFDL0MsTUFBTSxPQUFPLEdBQUcsSUFBQSxtQkFBVSxFQUFDLFVBQVUsRUFBRTtnQkFDckMsVUFBVSxFQUFFLDZCQUFvQixDQUFDLFVBQVU7YUFDNUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxVQUFVLEdBQUcsV0FBVyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzNELE1BQU0sYUFBYSxHQUFHLHVCQUFhLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRXBFLElBQUksV0FBVyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO2dCQUNwQixXQUFXLEdBQUcsSUFBQSx3QkFBZ0IsR0FBRSxDQUFDO2dCQUNqQyxJQUFJLENBQUMsWUFBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFdBQVcsZUFBZSxDQUFDLEVBQUU7b0JBQ2xELE1BQU0sb0VBQW9FLENBQUM7aUJBQzVFO2FBQ0Y7aUJBQU07Z0JBQ0wsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFBLHNCQUFhLEdBQUUsQ0FBQztnQkFDMUMsSUFBSSxXQUFXLENBQUM7Z0JBQ2hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDeEQsTUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEQsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxPQUFPLEVBQUU7d0JBQ2pDLFdBQVcsR0FBRyxJQUFJLENBQUM7d0JBQ25CLFdBQVcsQ0FBQyxZQUFZLEdBQUcsY0FBSyxDQUFDLE9BQU8sQ0FDdEMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQzVCLENBQUM7d0JBQ0YsTUFBTTtxQkFDUDtpQkFDRjtnQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNyQixJQUFJLENBQUMsV0FBVztvQkFDZCxNQUFNLDhEQUE4RCxPQUFPLENBQUMsT0FBTyxlQUFlLENBQUM7Z0JBQ3JHLGlCQUFpQjtnQkFDakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHO29CQUNsQixNQUFNLHdDQUF3QyxXQUFXLENBQUMsSUFBSSxrREFBa0QsQ0FBQztnQkFDbkgsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7b0JBQy9DLE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3pDLE1BQU0sZUFBZSxHQUFHLGNBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFFekUsUUFBUSxPQUFPLENBQUMsTUFBTSxFQUFFO3dCQUN0QixLQUFLLEdBQUcsQ0FBQzt3QkFDVCxLQUFLLFNBQVM7NEJBQ1osTUFBTSxjQUFjLEdBQUcsTUFBTSxhQUFhLGNBQWMsYUFBYSxJQUFJLE9BQU8sYUFBYSxjQUFLLENBQUMsUUFBUSxDQUN6RyxhQUFhLEVBQ2IsZUFBZSxDQUNoQixJQUFJLE9BQU8sRUFBRSxDQUFDOzRCQUVmLE9BQU8sQ0FBQyxHQUFHLENBQ1QsZ0JBQWdCLE9BQU8sMENBQ3JCLFdBQVcsQ0FBQyxJQUNkLDRDQUNFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxFQUNsRCxFQUFFLENBQ0gsQ0FBQzs0QkFDRix1QkFBYSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsRUFBRSxFQUFFO2dDQUMxQyxLQUFLLEVBQUUsSUFBSTs2QkFDWixDQUFDLENBQUM7NEJBQ0gsbUVBQW1FOzRCQUNuRSxNQUFNO3dCQUNSLEtBQUssR0FBRyxDQUFDO3dCQUNULEtBQUssSUFBSSxDQUFDO3dCQUNWLEtBQUssV0FBVzs0QkFDZCxPQUFPLENBQUMsR0FBRyxDQUNULGdCQUFnQixPQUFPLDBDQUNyQixXQUFXLENBQUMsSUFDZCw4Q0FDRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUMsRUFDbEQsRUFBRSxDQUNILENBQUM7NEJBQ0YsbUVBQW1FOzRCQUNuRSxnQkFBZ0I7NEJBQ2hCLE1BQU07NEJBQ04sTUFBTTtxQkFDVDtnQkFDSCxDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQztLQUFBO0lBM0VELHNCQTJFQyJ9