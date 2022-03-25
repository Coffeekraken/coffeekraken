import _parseArgs from "../../node/cli/parseArgs";
import _SNpmBinCliInterface from "./interface/SNpmBinCliInterface";
import _childProcess from "child_process";
import __packageRootDir from "../../node/path/packageRootDir";
import _fs from "fs";
import _path from "path";
import _findPackages from "../../node/monorepo/findPackages";
async function bin(stringArgs = "") {
  const argsObj = _parseArgs(stringArgs, {
    definition: _SNpmBinCliInterface.definition
  });
  const binCommand = `npm bin ${argsObj.global ? "-g" : ""}`;
  const binFolderPath = _childProcess.execSync(binCommand).toString();
  let packagePath;
  if (!argsObj.package) {
    packagePath = __packageRootDir();
    if (!_fs.existsSync(`${packagePath}/package.json`)) {
      throw "Sorry but you're not in any package folder to take the bin from...";
    }
  } else {
    const packagesObj = await _findPackages();
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
    if (!packageJson.bin)
      throw `Sorry but the package named "<yellow>${packageJson.name}</yellow>" does not have any bin's to install...`;
    Object.keys(packageJson.bin).forEach((binName) => {
      const binPath = packageJson.bin[binName];
      const binAbsolutePath = _path.resolve(packageJson.absolutePath, binPath);
      switch (argsObj.action) {
        case "i":
        case "install":
          const symlinkCommand = `cd ${binFolderPath} && rm -rf ${binFolderPath}/${binName} && ln -s ${_path.relative(binFolderPath, binAbsolutePath)} ${binName}`;
          console.log(`The "<yellow>${binName}</yellow>" bin from the package "<cyan>${packageJson.name}</cyan>" has been successfully installed ${argsObj.global ? "<magenta>globaly</magenta>" : ""}`);
          _childProcess.spawnSync(symlinkCommand, [], {
            shell: true
          });
          break;
        case "u":
        case "un":
        case "uninstall":
          console.log(`The "<yellow>${binName}</yellow>" bin from the package "<cyan>${packageJson.name}</cyan>" has been successfully uninstalled ${argsObj.global ? "<magenta>globaly</magenta>" : ""}`);
          break;
      }
    });
  }
}
export {
  bin as default
};
