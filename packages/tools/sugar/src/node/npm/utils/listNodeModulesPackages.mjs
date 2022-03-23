import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __packageRootDir from "../../path/packageRootDir";
import __glob from "glob-all";
import __fs from "fs";
import __unique from "../../../shared/array/unique";
function listNodeModulesPackages(settings) {
  const finalSettings = __spreadValues({
    pathes: [`${__packageRootDir()}/node_modules`],
    monorepo: false
  }, settings != null ? settings : {});
  if (finalSettings.monorepo) {
    finalSettings.pathes.push(`${__packageRootDir(process.cwd(), true)}/node_modules`);
  }
  const finalPaths = [];
  finalSettings.pathes.forEach((path) => {
    finalPaths.push(`${path}/*/package.json`);
    finalPaths.push(`${path}/*/*/package.json`);
  });
  finalSettings.pathes = __unique(finalSettings.pathes);
  const finalPackagesList = {};
  __glob.sync(finalPaths).forEach((path) => {
    let packageJson;
    try {
      packageJson = JSON.parse(__fs.readFileSync(path, "utf8"));
    } catch (e) {
      console.log(path.toUpperCase());
      console.log(e);
    }
    if (packageJson) {
      if (!finalPackagesList[packageJson.name]) {
        finalPackagesList[packageJson.name] = packageJson;
      }
    }
  });
  return finalPackagesList;
}
export {
  listNodeModulesPackages as default
};
