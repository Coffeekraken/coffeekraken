import "../../../../../chunk-TD77TI6B.mjs";
import __readJsonSync from "../fs/readJsonSync";
import __writeJsonSync from "../fs/writeJsonSync";
import __fs from "fs";
import __packageRoot from "../path/packageRoot";
function renamePackage(newName, packagePath = __packageRoot()) {
  if (!newName.match(/^[a-zA-Z0-9\/\@_-]+$/)) {
    throw new Error(`The passed name "<yellow>${newName}</yellow>" is not a valid package name. It has to follow this pattern: <cyan>/^[a-zA-Z0-9/@_-]+$/</cyan>`);
  }
  const packageJsonPath = `${packagePath}/package.json`;
  if (!__fs.existsSync(packageJsonPath)) {
    throw new Error(`The package.json file doesn't exist at path: ${packageJsonPath}`);
  }
  const json = __readJsonSync(packageJsonPath);
  json.name = newName;
  __writeJsonSync(packageJsonPath, json);
}
export {
  renamePackage as default
};
