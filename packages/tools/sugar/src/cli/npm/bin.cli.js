"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const parseArgs_1 = __importDefault(require("../../node/cli/parseArgs"));
const SNpmBinCliInterface_1 = __importDefault(require("./interface/SNpmBinCliInterface"));
const child_process_1 = __importDefault(require("child_process"));
const packageRoot_1 = __importDefault(require("../../node/path/packageRoot"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const findPackages_1 = __importDefault(require("../../node/monorepo/findPackages"));
function bin(stringArgs = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const argsObj = parseArgs_1.default(stringArgs, {
            definition: SNpmBinCliInterface_1.default.definition
        });
        const binCommand = `npm bin ${argsObj.global ? '-g' : ''}`;
        const binFolderPath = child_process_1.default.execSync(binCommand).toString();
        let packagePath;
        if (!argsObj.package) {
            packagePath = packageRoot_1.default();
            if (!fs_1.default.existsSync(`${packagePath}/package.json`)) {
                throw "Sorry but you're not in any package folder to take the bin from...";
            }
        }
        else {
            const packagesObj = yield findPackages_1.default();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJpbi5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0FBRWQseUVBQWtEO0FBQ2xELDBGQUFtRTtBQUNuRSxrRUFBMEM7QUFDMUMsOEVBQXdEO0FBRXhELDRDQUFxQjtBQUNyQixnREFBeUI7QUFDekIsb0ZBQTZEO0FBRTdELFNBQThCLEdBQUcsQ0FBQyxVQUFVLEdBQUcsRUFBRTs7UUFDL0MsTUFBTSxPQUFPLEdBQUcsbUJBQVUsQ0FBQyxVQUFVLEVBQUU7WUFDckMsVUFBVSxFQUFFLDZCQUFvQixDQUFDLFVBQVU7U0FDNUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxVQUFVLEdBQUcsV0FBVyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQzNELE1BQU0sYUFBYSxHQUFHLHVCQUFhLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRXBFLElBQUksV0FBVyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ3BCLFdBQVcsR0FBRyxxQkFBYSxFQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLFlBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxXQUFXLGVBQWUsQ0FBQyxFQUFFO2dCQUNsRCxNQUFNLG9FQUFvRSxDQUFDO2FBQzVFO1NBQ0Y7YUFBTTtZQUNMLE1BQU0sV0FBVyxHQUFHLE1BQU0sc0JBQWEsRUFBRSxDQUFDO1lBQzFDLElBQUksV0FBVyxDQUFDO1lBQ2hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDeEQsTUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEQsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxPQUFPLEVBQUU7b0JBQ2pDLFdBQVcsR0FBRyxJQUFJLENBQUM7b0JBQ25CLFdBQVcsQ0FBQyxZQUFZLEdBQUcsY0FBSyxDQUFDLE9BQU8sQ0FDdEMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQzVCLENBQUM7b0JBQ0YsTUFBTTtpQkFDUDthQUNGO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsV0FBVztnQkFDZCxNQUFNLDhEQUE4RCxPQUFPLENBQUMsT0FBTyxlQUFlLENBQUM7WUFDckcsaUJBQWlCO1lBQ2pCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRztnQkFDbEIsTUFBTSx3Q0FBd0MsV0FBVyxDQUFDLElBQUksa0RBQWtELENBQUM7WUFDbkgsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQy9DLE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sZUFBZSxHQUFHLGNBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFFekUsUUFBUSxPQUFPLENBQUMsTUFBTSxFQUFFO29CQUN0QixLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLFNBQVM7d0JBQ1osTUFBTSxjQUFjLEdBQUcsTUFBTSxhQUFhLGNBQWMsYUFBYSxJQUFJLE9BQU8sYUFBYSxjQUFLLENBQUMsUUFBUSxDQUN6RyxhQUFhLEVBQ2IsZUFBZSxDQUNoQixJQUFJLE9BQU8sRUFBRSxDQUFDO3dCQUVmLE9BQU8sQ0FBQyxHQUFHLENBQ1QsZ0JBQWdCLE9BQU8sMENBQ3JCLFdBQVcsQ0FBQyxJQUNkLDRDQUNFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxFQUNsRCxFQUFFLENBQ0gsQ0FBQzt3QkFDRix1QkFBYSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsRUFBRSxFQUFFOzRCQUMxQyxLQUFLLEVBQUUsSUFBSTt5QkFDWixDQUFDLENBQUM7d0JBQ0gsbUVBQW1FO3dCQUNuRSxNQUFNO29CQUNSLEtBQUssR0FBRyxDQUFDO29CQUNULEtBQUssSUFBSSxDQUFDO29CQUNWLEtBQUssV0FBVzt3QkFDZCxPQUFPLENBQUMsR0FBRyxDQUNULGdCQUFnQixPQUFPLDBDQUNyQixXQUFXLENBQUMsSUFDZCw4Q0FDRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUMsRUFDbEQsRUFBRSxDQUNILENBQUM7d0JBQ0YsbUVBQW1FO3dCQUNuRSxnQkFBZ0I7d0JBQ2hCLE1BQU07d0JBQ04sTUFBTTtpQkFDVDtZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0NBQUE7QUEzRUQsc0JBMkVDIn0=