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
import _parseArgs from '../../node/cli/parseArgs';
import _SNpmBinCliInterface from './interface/SNpmBinCliInterface';
import _childProcess from 'child_process';
import __packageRootDir from '../../node/path/packageRootDir';
import _fs from 'fs';
import _path from 'path';
import _findPackages from '../../node/monorepo/findPackages';
export default function bin(stringArgs = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const argsObj = _parseArgs(stringArgs, {
            definition: _SNpmBinCliInterface.definition,
        });
        const binCommand = `npm bin ${argsObj.global ? '-g' : ''}`;
        const binFolderPath = _childProcess.execSync(binCommand).toString();
        let packagePath;
        if (!argsObj.package) {
            packagePath = __packageRootDir();
            if (!_fs.existsSync(`${packagePath}/package.json`)) {
                throw "Sorry but you're not in any package folder to take the bin from...";
            }
        }
        else {
            const packagesObj = yield _findPackages();
            let packageJson;
            for (let i = 0; i < Object.keys(packagesObj).length; i++) {
                const json = packagesObj[Object.keys(packagesObj)[i]];
                if (json.name === argsObj.package) {
                    packageJson = json;
                    packageJson.absolutePath = _path.resolve(process.cwd(), Object.keys(packagesObj)[i]);
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
                const binAbsolutePath = _path.resolve(packageJson.absolutePath, binPath);
                switch (argsObj.action) {
                    case 'i':
                    case 'install':
                        const symlinkCommand = `cd ${binFolderPath} && rm -rf ${binFolderPath}/${binName} && ln -s ${_path.relative(binFolderPath, binAbsolutePath)} ${binName}`;
                        console.log(`The "<yellow>${binName}</yellow>" bin from the package "<cyan>${packageJson.name}</cyan>" has been successfully installed ${argsObj.global ? '<magenta>globaly</magenta>' : ''}`);
                        _childProcess.spawnSync(symlinkCommand, [], {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFVBQVUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLG9CQUFvQixNQUFNLGlDQUFpQyxDQUFDO0FBQ25FLE9BQU8sYUFBYSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLGdCQUFnQixNQUFNLGdDQUFnQyxDQUFDO0FBRTlELE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQztBQUNyQixPQUFPLEtBQUssTUFBTSxNQUFNLENBQUM7QUFDekIsT0FBTyxhQUFhLE1BQU0sa0NBQWtDLENBQUM7QUFFN0QsTUFBTSxDQUFDLE9BQU8sVUFBZ0IsR0FBRyxDQUFDLFVBQVUsR0FBRyxFQUFFOztRQUM3QyxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsVUFBVSxFQUFFO1lBQ25DLFVBQVUsRUFBRSxvQkFBb0IsQ0FBQyxVQUFVO1NBQzlDLENBQUMsQ0FBQztRQUVILE1BQU0sVUFBVSxHQUFHLFdBQVcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUMzRCxNQUFNLGFBQWEsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRXBFLElBQUksV0FBVyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ2xCLFdBQVcsR0FBRyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsV0FBVyxlQUFlLENBQUMsRUFBRTtnQkFDaEQsTUFBTSxvRUFBb0UsQ0FBQzthQUM5RTtTQUNKO2FBQU07WUFDSCxNQUFNLFdBQVcsR0FBRyxNQUFNLGFBQWEsRUFBRSxDQUFDO1lBQzFDLElBQUksV0FBVyxDQUFDO1lB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