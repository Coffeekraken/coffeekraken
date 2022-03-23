import {
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
import __SFile from "@coffeekraken/s-file";
import __fs from "fs";
import __glob from "glob";
import __path from "path";
import __expandGlob from "../../shared/glob/expandGlob";
import __deepMerge from "../../shared/object/deepMerge";
import __excludeGlobs from "../path/excludeGlobs";
function resolveGlob(globs, settings = {}) {
  settings = __deepMerge({
    cwd: settings.cwd || process.cwd(),
    symlinks: true,
    nodir: true,
    contentRegExp: void 0,
    SFile: true,
    exclude: [],
    defaultExcludes: true
  }, settings);
  const filesArray = [];
  if (!Array.isArray(globs))
    globs = [globs];
  for (let i = 0; i < globs.length; i++) {
    const glob = globs[i];
    let cwd = settings.cwd, globPattern, searchReg = settings.contentRegExp;
    if (__fs.existsSync(glob)) {
      if (settings.SFile) {
        const sFile = __SFile.new(glob, {
          file: {
            cwd
          }
        });
        filesArray.push(sFile);
      } else {
        filesArray.push(glob);
      }
      continue;
    }
    const splits = glob.split(":").map((split) => {
      return split.replace(`${cwd}/`, "").replace(cwd, "");
    });
    if (splits[1]) {
      const innerReg = splits[1].replace(/^\//, "").replace(/\/[a-zA-Z]{0,10}$/, "");
      let flags = splits[1].match(/\/[a-zA-Z]{1,10}$/g);
      if (flags) {
        flags = flags[0].replace("/", "");
      }
      searchReg = new RegExp(innerReg, flags != null ? flags : "");
    }
    globPattern = splits[0];
    globPattern = __path.resolve(cwd, globPattern);
    const finalPatterns = __expandGlob(globPattern);
    let pathes = [];
    finalPatterns.forEach((pattern) => {
      var _a;
      pathes = pathes.concat(__glob.sync(pattern, __spreadValues({
        cwd,
        nodir: settings.nodir,
        dot: true,
        follow: settings.symlinks,
        ignore: [
          ...(_a = settings.exclude) != null ? _a : [],
          ...settings.defaultExcludes ? __excludeGlobs() : []
        ]
      }, settings)));
    });
    if (searchReg) {
      pathes = pathes.filter((path) => {
        try {
          const content = __fs.readFileSync(path, "utf8").toString();
          const matches = content.match(searchReg);
          if (matches && matches.length) {
            return true;
          }
          return false;
        } catch (e) {
          return false;
        }
      });
    }
    pathes.forEach((path) => {
      if (settings.SFile) {
        const sFile = __SFile.new(path, {
          file: {
            cwd
          }
        });
        filesArray.push(sFile);
      } else {
        filesArray.push(path);
      }
    });
  }
  return filesArray;
}
export {
  resolveGlob as default
};
