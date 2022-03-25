import __fs from "fs";
import __toRegex from "to-regex";
import __minimatch from "minimatch";
import __deepMerge from "../../shared/object/deepMerge";
import __isDirectory from "../is/directory";
import __expandGlob from "../../shared/glob/expandGlob";
import __path from "path";
function matchGlob(input, glob, settings) {
  var _a, _b;
  settings = __deepMerge({
    cwd: (_a = settings == null ? void 0 : settings.cwd) != null ? _a : process.cwd(),
    symlinks: true,
    nodir: true
  }, settings != null ? settings : {});
  if (Array.isArray(glob)) {
    for (let i = 0; i < glob.length; i++) {
      if (matchGlob(input, glob[i], settings))
        return true;
    }
    return false;
  }
  const splits = glob.split(":");
  const pattern = splits[0].replace(`${settings.cwd}/`, "").replace(settings.cwd, "");
  const regex = splits[1];
  const fullFilePath = __path.resolve((_b = settings.cwd) != null ? _b : "", input);
  const expandedGlobs = __expandGlob(pattern);
  let hasMatch = false;
  for (let i = 0; i < expandedGlobs.length; i++) {
    const g = expandedGlobs[i];
    if (__minimatch(input, g)) {
      hasMatch = true;
      break;
    }
  }
  if (!hasMatch)
    return false;
  if (!__fs.existsSync(fullFilePath))
    return false;
  if (settings.nodir && __isDirectory(fullFilePath))
    return false;
  if (regex) {
    const fileContent = __fs.readFileSync(fullFilePath, "utf8").toString();
    const regSplits = regex.split("/").splice(1);
    const regString = regSplits[0];
    const flags = regSplits[regSplits.length - 1];
    const searchReg = __toRegex(regString, {
      flags
    });
    if (!fileContent.match(searchReg))
      return false;
  }
  return true;
}
export {
  matchGlob as default
};
