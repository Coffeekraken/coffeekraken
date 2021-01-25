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
const parseArgs_1 = __importDefault(require("../../node/cli/parseArgs"));
const SNpmBinCliInterface_1 = __importDefault(require("./interface/SNpmBinCliInterface"));
const child_process_1 = __importDefault(require("child_process"));
const packageRoot_1 = __importDefault(require("../../node/path/packageRoot"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const findPackages_1 = __importDefault(require("../../node/monorepo/findPackages"));
module.exports = function bin(stringArgs = '') {
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJpbi5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7QUFFZCx5RUFBa0Q7QUFDbEQsMEZBQW1FO0FBQ25FLGtFQUEwQztBQUMxQyw4RUFBd0Q7QUFFeEQsNENBQXFCO0FBQ3JCLGdEQUF5QjtBQUN6QixvRkFBNkQ7QUFFN0QsaUJBQVMsU0FBZSxHQUFHLENBQUMsVUFBVSxHQUFHLEVBQUU7O1FBQ3pDLE1BQU0sT0FBTyxHQUFHLG1CQUFVLENBQUMsVUFBVSxFQUFFO1lBQ3JDLFVBQVUsRUFBRSw2QkFBb0IsQ0FBQyxVQUFVO1NBQzVDLENBQUMsQ0FBQztRQUVILE1BQU0sVUFBVSxHQUFHLFdBQVcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUMzRCxNQUFNLGFBQWEsR0FBRyx1QkFBYSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVwRSxJQUFJLFdBQVcsQ0FBQztRQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtZQUNwQixXQUFXLEdBQUcscUJBQWEsRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxZQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsV0FBVyxlQUFlLENBQUMsRUFBRTtnQkFDbEQsTUFBTSxvRUFBb0UsQ0FBQzthQUM1RTtTQUNGO2FBQU07WUFDTCxNQUFNLFdBQVcsR0FBRyxNQUFNLHNCQUFhLEVBQUUsQ0FBQztZQUMxQyxJQUFJLFdBQVcsQ0FBQztZQUNoQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3hELE1BQU0sSUFBSSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RELElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsT0FBTyxFQUFFO29CQUNqQyxXQUFXLEdBQUcsSUFBSSxDQUFDO29CQUNuQixXQUFXLENBQUMsWUFBWSxHQUFHLGNBQUssQ0FBQyxPQUFPLENBQ3RDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUM1QixDQUFDO29CQUNGLE1BQU07aUJBQ1A7YUFDRjtZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFdBQVc7Z0JBQ2QsTUFBTSw4REFBOEQsT0FBTyxDQUFDLE9BQU8sZUFBZSxDQUFDO1lBQ3JHLGlCQUFpQjtZQUNqQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUc7Z0JBQ2xCLE1BQU0sd0NBQXdDLFdBQVcsQ0FBQyxJQUFJLGtEQUFrRCxDQUFDO1lBQ25ILE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUMvQyxNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN6QyxNQUFNLGVBQWUsR0FBRyxjQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBRXpFLFFBQVEsT0FBTyxDQUFDLE1BQU0sRUFBRTtvQkFDdEIsS0FBSyxHQUFHLENBQUM7b0JBQ1QsS0FBSyxTQUFTO3dCQUNaLE1BQU0sY0FBYyxHQUFHLE1BQU0sYUFBYSxjQUFjLGFBQWEsSUFBSSxPQUFPLGFBQWEsY0FBSyxDQUFDLFFBQVEsQ0FDekcsYUFBYSxFQUNiLGVBQWUsQ0FDaEIsSUFBSSxPQUFPLEVBQUUsQ0FBQzt3QkFFZixPQUFPLENBQUMsR0FBRyxDQUNULGdCQUFnQixPQUFPLDBDQUNyQixXQUFXLENBQUMsSUFDZCw0Q0FDRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUMsRUFDbEQsRUFBRSxDQUNILENBQUM7d0JBQ0YsdUJBQWEsQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLEVBQUUsRUFBRTs0QkFDMUMsS0FBSyxFQUFFLElBQUk7eUJBQ1osQ0FBQyxDQUFDO3dCQUNILG1FQUFtRTt3QkFDbkUsTUFBTTtvQkFDUixLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLElBQUksQ0FBQztvQkFDVixLQUFLLFdBQVc7d0JBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FDVCxnQkFBZ0IsT0FBTywwQ0FDckIsV0FBVyxDQUFDLElBQ2QsOENBQ0UsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDLEVBQ2xELEVBQUUsQ0FDSCxDQUFDO3dCQUNGLG1FQUFtRTt3QkFDbkUsZ0JBQWdCO3dCQUNoQixNQUFNO3dCQUNOLE1BQU07aUJBQ1Q7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztDQUFBLENBQUMifQ==