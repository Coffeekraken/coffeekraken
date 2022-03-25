import __packageRootDir from "./packageRootDir";
import __fs from "fs";
import __readJsonSync from "@coffeekraken/sugar/node/fs/readJsonSync";
function isInPackage(name, from = process.cwd(), highest = false) {
  const packageRootDir = __packageRootDir(from);
  if (!packageRootDir)
    return false;
  if (!__fs.existsSync(`${packageRootDir}/package.json`))
    return false;
  const pkg = __readJsonSync(`${packageRootDir}/package.json`);
  let names = name;
  if (typeof names === "string")
    names = names.split(",").map((f) => f.trim());
  for (let i = 0; i < names.length; i++) {
    if (names[i] === pkg.name) {
      return true;
    }
  }
  const newPath = packageRootDir.split("/").slice(0, -1).join("/");
  if (highest) {
    return isInPackage(name, newPath, highest);
  }
  return false;
}
var isInPackage_default = isInPackage;
export {
  isInPackage_default as default
};
