import { n as SSugarConfig, c as __deepMerge, O as getAugmentedNamespace, B as getDefaultExportFromCjs, P as require$$0$1, Q as objectHash, d as commonjsGlobal } from "./index.esm.js";
import { _ as __fs, a as __viteBrowserExternal_fs } from "./__vite-browser-external_fs-15d823eb.js";
function __distCssDir(settings = {}) {
  settings = Object.assign({}, settings);
  return SSugarConfig.get("storage.dist.cssDir");
}
function __distDocDir(settings = {}) {
  settings = Object.assign({}, settings);
  return SSugarConfig.get("storage.dist.docDir");
}
function __distFontsDir(settings = {}) {
  settings = Object.assign({}, settings);
  return SSugarConfig.get("storage.dist.fontsDir");
}
function __distIconsDir(settings = {}) {
  settings = Object.assign({}, settings);
  return SSugarConfig.get("storage.dist.iconsDir");
}
function __distImgDir(settings = {}) {
  settings = Object.assign({}, settings);
  return SSugarConfig.get("storage.dist.imgDir");
}
function __distJsDir(settings = {}) {
  settings = Object.assign({}, settings);
  return SSugarConfig.get("storage.dist.jsDir");
}
function __distNodeDir(settings = {}) {
  settings = Object.assign({}, settings);
  return SSugarConfig.get("storage.dist.nodeDir");
}
function __distRootDir(settings = {}) {
  settings = Object.assign({}, settings);
  return SSugarConfig.get("storage.dist.rootDir");
}
function __distViewsDir(settings = {}) {
  settings = Object.assign({}, settings);
  return SSugarConfig.get("storage.dist.viewsDir");
}
function __packageCacheDir(settings = {}) {
  settings = Object.assign({}, settings);
  return SSugarConfig.get("storage.package.cacheDir");
}
function __packageLocalDir() {
  return SSugarConfig.get("storage.package.localDir");
}
function __isFile(path2, settings = {}) {
  settings = __deepMerge({
    symlink: true
  }, settings);
  let isMatching = __fs.existsSync(path2);
  if (!isMatching)
    return false;
  if (settings.symlink && __fs.lstatSync(path2).isSymbolicLink()) {
    const realPath = __fs.realpathSync(path2);
    isMatching = isMatching && __fs.lstatSync(realPath).isFile();
  } else {
    isMatching = isMatching && __fs.lstatSync(path2).isFile();
  }
  return isMatching;
}
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal_fs);
var path = require$$0$1, fs$1 = require$$0;
function parse(data) {
  data = data.toString("utf-8");
  if (data.charCodeAt(0) === 65279)
    data = data.slice(1);
  try {
    return JSON.parse(data);
  } catch (e) {
    return false;
  }
}
var iteratorSymbol = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.iterator : null;
function addSymbolIterator(result) {
  if (!iteratorSymbol) {
    return result;
  }
  result[iteratorSymbol] = function() {
    return this;
  };
  return result;
}
var findPackageJson = function find(root) {
  root = root || process.cwd();
  if (typeof root !== "string") {
    if (typeof root === "object" && typeof root.filename === "string") {
      root = root.filename;
    } else {
      throw new Error("Must pass a filename string or a module object to finder");
    }
  }
  return addSymbolIterator({
    /**
     * Return the parsed package.json that we find in a parent folder.
     *
     * @returns {Object} Value, filename and indication if the iteration is done.
     * @api public
     */
    next: function next() {
      if (root.match(/^(\w:\\|\/)$/))
        return addSymbolIterator({
          value: void 0,
          filename: void 0,
          done: true
        });
      var file = path.join(root, "package.json"), data;
      root = path.resolve(root, "..");
      if (fs$1.existsSync(file) && (data = parse(fs$1.readFileSync(file)))) {
        data.__path = file;
        return addSymbolIterator({
          value: data,
          filename: file,
          done: false
        });
      }
      return next();
    }
  });
};
const __findPkgJson = /* @__PURE__ */ getDefaultExportFromCjs(findPackageJson);
const __packageRootDirsCache = {};
function __packageRootDir(from = process.cwd(), settings) {
  const finalSettings = Object.assign({ highest: false, upCount: void 0, requiredProperties: ["name", "version"] }, settings !== null && settings !== void 0 ? settings : {});
  const storageKey = objectHash(Object.assign({ from }, finalSettings));
  if (!from && __packageRootDirsCache[storageKey]) {
    return __packageRootDirsCache[storageKey];
  }
  if (__isFile(from))
    from = from.split("/").slice(0, -1).join("/");
  const f = __findPkgJson(from);
  let file = f.next();
  let finalFile, upCountIdx = 0;
  if (!file || !file.filename) {
    return false;
  }
  while (!file.done) {
    if (file.done) {
      break;
    }
    if (finalSettings.upCount && !finalSettings.highest) {
      if (upCountIdx >= finalSettings.upCount) {
        break;
      }
    }
    if (!finalSettings.highest) {
      if (finalSettings.requiredProperties) {
        let allProps = true;
        finalSettings.requiredProperties.forEach((prop) => {
          if (!allProps)
            return;
          if (file.value[prop] === void 0)
            allProps = false;
        });
        if (allProps) {
          upCountIdx++;
          finalFile = file;
          if (!finalSettings.upCount) {
            break;
          }
        }
      } else {
        upCountIdx++;
        finalFile = file;
        if (!finalSettings.upCount) {
          break;
        }
      }
    } else {
      finalFile = file;
    }
    file = f.next();
  }
  if (!finalFile) {
    return false;
  }
  const finalPath = finalFile.filename.split("/").slice(0, -1).join("/");
  __packageRootDirsCache[storageKey] = finalPath;
  return finalPath;
}
function __packageTmpDir() {
  return SSugarConfig.get("storage.package.tmpDir");
}
const os$1 = new Proxy({}, {
  get(_, key) {
    throw new Error(`Module "os" has been externalized for browser compatibility. Cannot access "os.${key}" in client code.  See http://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
  }
});
const __viteBrowserExternal_os = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: os$1
}, Symbol.toStringTag, { value: "Module" }));
/*!
 * userdir v1.0.0
 * A simple utility to get the cross-platform user home directory
 * (c) 2021-2023 saqqdy 
 * Released under the MIT License.
 */
function userdir() {
  const env = process.env;
  const home = env.HOME;
  const user = env.LOGNAME || env.USER || env.LNAME || env.USERNAME;
  if (process.platform === "win32") {
    return env.USERPROFILE || (env.HOMEDRIVE || "") + (env.HOMEPATH || "") || home || null;
  }
  if (process.platform === "darwin") {
    return home || (user ? "/Users/" + user : null);
  }
  if (process.platform === "linux") {
    if (home)
      return home;
    else if (process.getuid && process.getuid() === 0)
      return "/root";
    else if (user)
      return "/home/" + user;
    return null;
  }
  return home || null;
}
var index = typeof os$1.homedir === "function" ? os$1.homedir : userdir;
function homeDir() {
  return index();
}
function __srcCssDir(settings = {}) {
  settings = Object.assign({}, settings);
  return SSugarConfig.get("storage.src.cssDir");
}
function __srcDocDir(settings = {}) {
  settings = Object.assign({}, settings);
  return SSugarConfig.get("storage.src.docDir");
}
function __srcFontsDir(settings = {}) {
  settings = Object.assign({}, settings);
  return SSugarConfig.get("storage.src.fontsDir");
}
function __srcIconsDir(settings = {}) {
  settings = Object.assign({}, settings);
  return SSugarConfig.get("storage.src.iconsDir");
}
function __srcImgDir(settings = {}) {
  settings = Object.assign({}, settings);
  return SSugarConfig.get("storage.src.imgDir");
}
function __srcJsDir(settings = {}) {
  settings = Object.assign({}, settings);
  return SSugarConfig.get("storage.src.jsDir");
}
function __srcNodeDir(settings = {}) {
  settings = Object.assign({}, settings);
  return SSugarConfig.get("storage.src.nodeDir");
}
function __srcRootDir(settings = {}) {
  settings = Object.assign({}, settings);
  return SSugarConfig.get("storage.src.rootDir");
}
function __srcViewsDir(settings = {}) {
  settings = Object.assign({}, settings);
  return SSugarConfig.get("storage.src.viewsDir");
}
function __replacePathTokens(paths, settings) {
  const set = Object.assign({ packageTmpDir: true, packageLocalDir: true, packageCacheDir: true, packageRootDir: true, srcRootDir: true, distRootDir: true, srcJsDir: true, srcCssDir: true, srcDocDir: true, srcFontsDir: true, srcIconsDir: true, srcImgDir: true, srcNodeDir: true, srcViewsDir: true, distJsDir: true, distCssDir: true, distDocDir: true, distFontsDir: true, distIconsDir: true, distImgDir: true, distNodeDir: true, distViewsDir: true }, settings);
  const isArray = Array.isArray(paths);
  if (!isArray)
    paths = [paths];
  const finalPaths = paths.map((path2) => {
    if (set.packageTmpDir)
      path2 = path2.replace("%packageTmpDir", __packageTmpDir());
    if (set.packageLocalDir)
      path2 = path2.replace("%packageLocalDir", __packageLocalDir());
    if (set.packageCacheDir)
      path2 = path2.replace("%packageCacheDir", __packageCacheDir());
    if (set.packageRootDir)
      path2 = path2.replace("%packageRootDir", __packageRootDir());
    if (set.srcRootDir)
      path2 = path2.replace("%srcRootDir", __srcRootDir());
    if (set.distRootDir)
      path2 = path2.replace("%distRootDir", __distRootDir());
    if (set.srcJsDir)
      path2 = path2.replace("%srcJsDir", __srcJsDir());
    if (set.srcCssDir)
      path2 = path2.replace("%srcCssDir", __srcCssDir());
    if (set.srcDocDir)
      path2 = path2.replace("%srcDocDir", __srcDocDir());
    if (set.srcFontsDir)
      path2 = path2.replace("%srcFontsDir", __srcFontsDir());
    if (set.srcIconsDir)
      path2 = path2.replace("%srcIconsDir", __srcIconsDir());
    if (set.srcImgDir)
      path2 = path2.replace("%srcImgDir", __srcImgDir());
    if (set.srcNodeDir)
      path2 = path2.replace("%srcNodeDir", __srcNodeDir());
    if (set.srcViewsDir)
      path2 = path2.replace("%srcViewsDir", __srcViewsDir());
    if (set.distJsDir)
      path2 = path2.replace("%distJsDir", __distJsDir());
    if (set.distCssDir)
      path2 = path2.replace("%distCssDir", __distCssDir());
    if (set.distDocDir)
      path2 = path2.replace("%distDocDir", __distDocDir());
    if (set.distFontsDir)
      path2 = path2.replace("%distFontsDir", __distFontsDir());
    if (set.distIconsDir)
      path2 = path2.replace("%distIconsDir", __distIconsDir());
    if (set.distImgDir)
      path2 = path2.replace("%distImgDir", __distImgDir());
    if (set.distNodeDir)
      path2 = path2.replace("%distNodeDir", __distNodeDir());
    if (set.distViewsDir)
      path2 = path2.replace("%distViewsDir", __distViewsDir());
    path2 = path2.replace(/\/\//gm, "/");
    return path2;
  });
  if (isArray)
    return finalPaths;
  else
    return finalPaths[0];
}
function __sugarRootDir(settings = {}) {
  settings = Object.assign({}, settings);
  return SSugarConfig.get("storage.sugar.rootDir");
}
const require$$1 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal_os);
const fs = require$$0;
const os = require$$1;
const tempDirectorySymbol = Symbol.for("__RESOLVED_TEMP_DIRECTORY__");
if (!commonjsGlobal[tempDirectorySymbol]) {
  Object.defineProperty(commonjsGlobal, tempDirectorySymbol, {
    value: fs.realpathSync(os.tmpdir())
  });
}
var tempDir = commonjsGlobal[tempDirectorySymbol];
const __tmpDir = /* @__PURE__ */ getDefaultExportFromCjs(tempDir);
function __systemTmpDir() {
  return __tmpDir;
}
export {
  __distCssDir,
  __distDocDir,
  __distFontsDir,
  __distIconsDir,
  __distImgDir,
  __distJsDir,
  __distNodeDir,
  __distRootDir,
  __distViewsDir,
  homeDir as __homeDir,
  __packageCacheDir,
  __packageLocalDir,
  __packageRootDir,
  __packageTmpDir,
  __replacePathTokens,
  __srcCssDir,
  __srcDocDir,
  __srcFontsDir,
  __srcIconsDir,
  __srcImgDir,
  __srcJsDir,
  __srcNodeDir,
  __srcRootDir,
  __srcViewsDir,
  __sugarRootDir,
  __systemTmpDir
};
