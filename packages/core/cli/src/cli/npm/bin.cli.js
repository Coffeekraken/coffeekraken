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
            definition: _SNpmBinCliInterface.definition
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
            console.log(argsObj);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJpbi5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sVUFBVSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xELE9BQU8sb0JBQW9CLE1BQU0saUNBQWlDLENBQUM7QUFDbkUsT0FBTyxhQUFhLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sZ0JBQWdCLE1BQU0sZ0NBQWdDLENBQUM7QUFFOUQsT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDO0FBQ3JCLE9BQU8sS0FBSyxNQUFNLE1BQU0sQ0FBQztBQUN6QixPQUFPLGFBQWEsTUFBTSxrQ0FBa0MsQ0FBQztBQUU3RCxNQUFNLENBQUMsT0FBTyxVQUFnQixHQUFHLENBQUMsVUFBVSxHQUFHLEVBQUU7O1FBQy9DLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxVQUFVLEVBQUU7WUFDckMsVUFBVSxFQUFFLG9CQUFvQixDQUFDLFVBQVU7U0FDNUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxVQUFVLEdBQUcsV0FBVyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQzNELE1BQU0sYUFBYSxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFcEUsSUFBSSxXQUFXLENBQUM7UUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7WUFDcEIsV0FBVyxHQUFHLGdCQUFnQixFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxXQUFXLGVBQWUsQ0FBQyxFQUFFO2dCQUNsRCxNQUFNLG9FQUFvRSxDQUFDO2FBQzVFO1NBQ0Y7YUFBTTtZQUNMLE1BQU0sV0FBVyxHQUFHLE1BQU0sYUFBYSxFQUFFLENBQUM7WUFDMUMsSUFBSSxXQUFXLENBQUM7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