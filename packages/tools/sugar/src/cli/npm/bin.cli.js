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
import __packageRoot from '../../node/path/packageRoot';
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
            packagePath = __packageRoot();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluLmNsaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJpbi5jbGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sVUFBVSxNQUFNLDBCQUEwQixDQUFDO0FBQ2xELE9BQU8sb0JBQW9CLE1BQU0saUNBQWlDLENBQUM7QUFDbkUsT0FBTyxhQUFhLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sYUFBYSxNQUFNLDZCQUE2QixDQUFDO0FBRXhELE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQztBQUNyQixPQUFPLEtBQUssTUFBTSxNQUFNLENBQUM7QUFDekIsT0FBTyxhQUFhLE1BQU0sa0NBQWtDLENBQUM7QUFFN0QsTUFBTSxDQUFDLE9BQU8sVUFBZ0IsR0FBRyxDQUFDLFVBQVUsR0FBRyxFQUFFOztRQUMvQyxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsVUFBVSxFQUFFO1lBQ3JDLFVBQVUsRUFBRSxvQkFBb0IsQ0FBQyxVQUFVO1NBQzVDLENBQUMsQ0FBQztRQUVILE1BQU0sVUFBVSxHQUFHLFdBQVcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUMzRCxNQUFNLGFBQWEsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRXBFLElBQUksV0FBVyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ3BCLFdBQVcsR0FBRyxhQUFhLEVBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFdBQVcsZUFBZSxDQUFDLEVBQUU7Z0JBQ2xELE1BQU0sb0VBQW9FLENBQUM7YUFDNUU7U0FDRjthQUFNO1lBQ0wsTUFBTSxXQUFXLEdBQUcsTUFBTSxhQUFhLEVBQUUsQ0FBQztZQUMxQyxJQUFJLFdBQVcsQ0FBQztZQUNo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