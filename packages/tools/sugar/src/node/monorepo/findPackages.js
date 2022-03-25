import _glob from "glob";
import __readJsonSync from "@coffeekraken/sugar/node/fs/readJsonSync";
async function findPackages(rootDir = process.cwd()) {
  const packagesObj = {};
  const packagesPaths = _glob.sync("**/package.json", {
    cwd: rootDir,
    ignore: "**/node_modules/**"
  }).filter((path) => path !== "package.json");
  packagesPaths.forEach((path) => {
    const folder = path.split("/").slice(0, -1).join("/");
    packagesObj[folder] = __readJsonSync(`${rootDir}/${path}`);
  });
  return packagesObj;
}
export {
  findPackages as default
};
