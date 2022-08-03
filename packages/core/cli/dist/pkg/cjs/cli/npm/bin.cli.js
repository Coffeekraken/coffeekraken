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
const packageRootDir_1 = __importDefault(require("../../node/path/packageRootDir"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const findPackages_1 = __importDefault(require("../../node/monorepo/findPackages"));
function bin(stringArgs = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const argsObj = (0, parseArgs_1.default)(stringArgs, {
            definition: SNpmBinCliInterface_1.default.definition,
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
            // console.log(argsObj);
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
                            shell: true,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLHlFQUFrRDtBQUNsRCwwRkFBbUU7QUFDbkUsa0VBQTBDO0FBQzFDLG9GQUE4RDtBQUU5RCw0Q0FBcUI7QUFDckIsZ0RBQXlCO0FBQ3pCLG9GQUE2RDtBQUU3RCxTQUE4QixHQUFHLENBQUMsVUFBVSxHQUFHLEVBQUU7O1FBQzdDLE1BQU0sT0FBTyxHQUFHLElBQUEsbUJBQVUsRUFBQyxVQUFVLEVBQUU7WUFDbkMsVUFBVSxFQUFFLDZCQUFvQixDQUFDLFVBQVU7U0FDOUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxVQUFVLEdBQUcsV0FBVyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQzNELE1BQU0sYUFBYSxHQUFHLHVCQUFhLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRXBFLElBQUksV0FBVyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ2xCLFdBQVcsR0FBRyxJQUFBLHdCQUFnQixHQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLFlBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxXQUFXLGVBQWUsQ0FBQyxFQUFFO2dCQUNoRCxNQUFNLG9FQUFvRSxDQUFDO2FBQzlFO1NBQ0o7YUFBTTtZQUNILE1BQU0sV0FBVyxHQUFHLE1BQU0sSUFBQSxzQkFBYSxHQUFFLENBQUM7WUFDMUMsSUFBSSxXQUFXLENBQUM7WUFDaEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN0RCxNQUFNLElBQUksR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0RCxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLE9BQU8sRUFBRTtvQkFDL0IsV0FBVyxHQUFHLElBQUksQ0FBQztvQkFDbkIsV0FBVyxDQUFDLFlBQVksR0FBRyxjQUFLLENBQUMsT0FBTyxDQUNwQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDOUIsQ0FBQztvQkFDRixNQUFNO2lCQUNUO2FBQ0o7WUFDRCx3QkFBd0I7WUFDeEIsSUFBSSxDQUFDLFdBQVc7Z0JBQ1osTUFBTSw4REFBOEQsT0FBTyxDQUFDLE9BQU8sZUFBZSxDQUFDO1lBQ3ZHLGlCQUFpQjtZQUNqQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUc7Z0JBQ2hCLE1BQU0sd0NBQXdDLFdBQVcsQ0FBQyxJQUFJLGtEQUFrRCxDQUFDO1lBQ3JILE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUM3QyxNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN6QyxNQUFNLGVBQWUsR0FBRyxjQUFLLENBQUMsT0FBTyxDQUNqQyxXQUFXLENBQUMsWUFBWSxFQUN4QixPQUFPLENBQ1YsQ0FBQztnQkFFRixRQUFRLE9BQU8sQ0FBQyxNQUFNLEVBQUU7b0JBQ3BCLEtBQUssR0FBRyxDQUFDO29CQUNULEtBQUssU0FBUzt3QkFDVixNQUFNLGNBQWMsR0FBRyxNQUFNLGFBQWEsY0FBYyxhQUFhLElBQUksT0FBTyxhQUFhLGNBQUssQ0FBQyxRQUFRLENBQ3ZHLGFBQWEsRUFDYixlQUFlLENBQ2xCLElBQUksT0FBTyxFQUFFLENBQUM7d0JBRWYsT0FBTyxDQUFDLEdBQUcsQ0FDUCxnQkFBZ0IsT0FBTywwQ0FDbkIsV0FBVyxDQUFDLElBQ2hCLDRDQUNJLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxFQUNwRCxFQUFFLENBQ0wsQ0FBQzt3QkFDRix1QkFBYSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsRUFBRSxFQUFFOzRCQUN4QyxLQUFLLEVBQUUsSUFBSTt5QkFDZCxDQUFDLENBQUM7d0JBQ0gsbUVBQW1FO3dCQUNuRSxNQUFNO29CQUNWLEtBQUssR0FBRyxDQUFDO29CQUNULEtBQUssSUFBSSxDQUFDO29CQUNWLEtBQUssV0FBVzt3QkFDWixPQUFPLENBQUMsR0FBRyxDQUNQLGdCQUFnQixPQUFPLDBDQUNuQixXQUFXLENBQUMsSUFDaEIsOENBQ0ksT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDLEVBQ3BELEVBQUUsQ0FDTCxDQUFDO3dCQUNGLG1FQUFtRTt3QkFDbkUsZ0JBQWdCO3dCQUNoQixNQUFNO3dCQUNOLE1BQU07aUJBQ2I7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztDQUFBO0FBOUVELHNCQThFQyJ9