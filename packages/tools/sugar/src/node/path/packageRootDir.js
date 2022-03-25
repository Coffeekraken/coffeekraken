import __packageRoot from "./packageRoot";
global.packageRootDirs = {};
function packageRootDir_default(from = process.cwd(), highest = false) {
  const storageKey = `${from}-${highest ? "highest" : ""}`;
  if (!from && global.packageRootDirs[storageKey])
    return global.packageRootDirs[storageKey];
  const path = __packageRoot(from, highest);
  global.packageRootDirs[storageKey] = path;
  return path;
}
export {
  packageRootDir_default as default
};
