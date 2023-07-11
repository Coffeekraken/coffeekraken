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
const child_process_1 = __importDefault(require("child_process"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const parseArgs_js_1 = __importDefault(require("../../node/cli/parseArgs.js"));
const findPackages_js_1 = __importDefault(require("../../node/monorepo/findPackages.js"));
const packageRootDir_js_1 = __importDefault(require("../../node/path/packageRootDir.js"));
const SNpmBinCliInterface_js_1 = __importDefault(require("./interface/SNpmBinCliInterface.js"));
function bin(stringArgs = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const argsObj = (0, parseArgs_js_1.default)(stringArgs, {
            definition: SNpmBinCliInterface_js_1.default.definition,
        });
        const binCommand = `npm bin ${argsObj.global ? '--location=global' : ''}`;
        const binFolderPath = child_process_1.default.execSync(binCommand).toString();
        let packagePath;
        if (!argsObj.package) {
            packagePath = (0, packageRootDir_js_1.default)();
            if (!fs_1.default.existsSync(`${packagePath}/package.json`)) {
                throw "Sorry but you're not in any package folder to take the bin from...";
            }
        }
        else {
            const packagesObj = yield (0, findPackages_js_1.default)();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLGtFQUEwQztBQUMxQyw0Q0FBcUI7QUFDckIsZ0RBQXlCO0FBQ3pCLCtFQUFxRDtBQUNyRCwwRkFBZ0U7QUFDaEUsMEZBQWlFO0FBQ2pFLGdHQUFzRTtBQUV0RSxTQUE4QixHQUFHLENBQUMsVUFBVSxHQUFHLEVBQUU7O1FBQzdDLE1BQU0sT0FBTyxHQUFHLElBQUEsc0JBQVUsRUFBQyxVQUFVLEVBQUU7WUFDbkMsVUFBVSxFQUFFLGdDQUFvQixDQUFDLFVBQVU7U0FDOUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxVQUFVLEdBQUcsV0FBVyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDMUUsTUFBTSxhQUFhLEdBQUcsdUJBQWEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFcEUsSUFBSSxXQUFXLENBQUM7UUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDbEIsV0FBVyxHQUFHLElBQUEsMkJBQWdCLEdBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsWUFBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFdBQVcsZUFBZSxDQUFDLEVBQUU7Z0JBQ2hELE1BQU0sb0VBQW9FLENBQUM7YUFDOUU7U0FDSjthQUFNO1lBQ0gsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFBLHlCQUFhLEdBQUUsQ0FBQztZQUMxQyxJQUFJLFdBQVcsQ0FBQztZQUNoQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3RELE1BQU0sSUFBSSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RELElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsT0FBTyxFQUFFO29CQUMvQixXQUFXLEdBQUcsSUFBSSxDQUFDO29CQUNuQixXQUFXLENBQUMsWUFBWSxHQUFHLGNBQUssQ0FBQyxPQUFPLENBQ3BDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUM5QixDQUFDO29CQUNGLE1BQU07aUJBQ1Q7YUFDSjtZQUNELHdCQUF3QjtZQUN4QixJQUFJLENBQUMsV0FBVztnQkFDWixNQUFNLDhEQUE4RCxPQUFPLENBQUMsT0FBTyxlQUFlLENBQUM7WUFDdkcsaUJBQWlCO1lBQ2pCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRztnQkFDaEIsTUFBTSx3Q0FBd0MsV0FBVyxDQUFDLElBQUksa0RBQWtELENBQUM7WUFDckgsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQzdDLE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sZUFBZSxHQUFHLGNBQUssQ0FBQyxPQUFPLENBQ2pDLFdBQVcsQ0FBQyxZQUFZLEVBQ3hCLE9BQU8sQ0FDVixDQUFDO2dCQUVGLFFBQVEsT0FBTyxDQUFDLE1BQU0sRUFBRTtvQkFDcEIsS0FBSyxHQUFHLENBQUM7b0JBQ1QsS0FBSyxTQUFTO3dCQUNWLE1BQU0sY0FBYyxHQUFHLE1BQU0sYUFBYSxjQUFjLGFBQWEsSUFBSSxPQUFPLGFBQWEsY0FBSyxDQUFDLFFBQVEsQ0FDdkcsYUFBYSxFQUNiLGVBQWUsQ0FDbEIsSUFBSSxPQUFPLEVBQUUsQ0FBQzt3QkFFZixPQUFPLENBQUMsR0FBRyxDQUNQLGdCQUFnQixPQUFPLDBDQUNuQixXQUFXLENBQUMsSUFDaEIsNENBQ0ksT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDLEVBQ3BELEVBQUUsQ0FDTCxDQUFDO3dCQUNGLHVCQUFhLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxFQUFFLEVBQUU7NEJBQ3hDLEtBQUssRUFBRSxJQUFJO3lCQUNkLENBQUMsQ0FBQzt3QkFDSCxtRUFBbUU7d0JBQ25FLE1BQU07b0JBQ1YsS0FBSyxHQUFHLENBQUM7b0JBQ1QsS0FBSyxJQUFJLENBQUM7b0JBQ1YsS0FBSyxXQUFXO3dCQUNaLE9BQU8sQ0FBQyxHQUFHLENBQ1AsZ0JBQWdCLE9BQU8sMENBQ25CLFdBQVcsQ0FBQyxJQUNoQiw4Q0FDSSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUMsRUFDcEQsRUFBRSxDQUNMLENBQUM7d0JBQ0YsbUVBQW1FO3dCQUNuRSxnQkFBZ0I7d0JBQ2hCLE1BQU07d0JBQ04sTUFBTTtpQkFDYjtZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0NBQUE7QUE5RUQsc0JBOEVDIn0=