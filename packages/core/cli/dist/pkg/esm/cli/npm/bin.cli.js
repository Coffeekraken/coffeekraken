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
import _childProcess from 'child_process';
import _fs from 'fs';
import _path from 'path';
import _parseArgs from '../../node/cli/parseArgs.js';
import _findPackages from '../../node/monorepo/findPackages.js';
import __packageRootDir from '../../node/path/packageRootDir.js';
import _SNpmBinCliInterface from './interface/SNpmBinCliInterface.js';
export default function bin(stringArgs = '') {
    return __awaiter(this, void 0, void 0, function* () {
        const argsObj = _parseArgs(stringArgs, {
            definition: _SNpmBinCliInterface.definition,
        });
        const binCommand = `npm bin ${argsObj.global ? '--location=global' : ''}`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGFBQWEsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDO0FBQ3JCLE9BQU8sS0FBSyxNQUFNLE1BQU0sQ0FBQztBQUN6QixPQUFPLFVBQVUsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRCxPQUFPLGFBQWEsTUFBTSxxQ0FBcUMsQ0FBQztBQUNoRSxPQUFPLGdCQUFnQixNQUFNLG1DQUFtQyxDQUFDO0FBQ2pFLE9BQU8sb0JBQW9CLE1BQU0sb0NBQW9DLENBQUM7QUFFdEUsTUFBTSxDQUFDLE9BQU8sVUFBZ0IsR0FBRyxDQUFDLFVBQVUsR0FBRyxFQUFFOztRQUM3QyxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsVUFBVSxFQUFFO1lBQ25DLFVBQVUsRUFBRSxvQkFBb0IsQ0FBQyxVQUFVO1NBQzlDLENBQUMsQ0FBQztRQUVILE1BQU0sVUFBVSxHQUFHLFdBQVcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQzFFLE1BQU0sYUFBYSxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFcEUsSUFBSSxXQUFXLENBQUM7UUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDbEIsV0FBVyxHQUFHLGdCQUFnQixFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxXQUFXLGVBQWUsQ0FBQyxFQUFFO2dCQUNoRCxNQUFNLG9FQUFvRSxDQUFDO2FBQzlFO1NBQ0o7YUFBTTtZQUNILE1BQU0sV0FBVyxHQUFHLE1BQU0sYUFBYSxFQUFFLENBQUM7WUFDMUMsSUFBSSxXQUFXLENBQUM7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