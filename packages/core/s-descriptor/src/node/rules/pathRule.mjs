import "../../../../../chunk-TD77TI6B.mjs";
import __isPath from "@coffeekraken/sugar/shared/is/path";
import __isGlob from "@coffeekraken/sugar/shared/is/glob";
import __isNode from "@coffeekraken/sugar/shared/is/node";
import __fs from "fs";
import __path from "path";
import __replaceTokens from "@coffeekraken/sugar/node/token/replaceTokens";
import __resolveGlob from "@coffeekraken/sugar/node/glob/resolveGlob";
const ruleObj = {
  name: "Path",
  id: "path",
  settings: {
    mapOnArray: true
  },
  processParams: (params) => {
    var _a, _b, _c, _d, _e, _f, _g;
    return {
      absolute: (_a = params.absolute) != null ? _a : false,
      exists: (_b = params.exists) != null ? _b : false,
      create: (_c = params.create) != null ? _c : false,
      rootDir: (_d = params.rootDir) != null ? _d : process && process.cwd ? process.cwd() : "/",
      glob: (_e = params.glob) != null ? _e : false,
      tokens: (_f = params.tokens) != null ? _f : true,
      cast: (_g = params.cast) != null ? _g : true
    };
  },
  apply: (value, params, ruleSettings, settings) => {
    if (typeof value !== "string") {
      return new Error("The path value must be a <yellow>String</yellow>");
    }
    function toAbsolute(path) {
      if (params.absolute && path.slice(0, 1) !== "/") {
        if (!params.cast)
          return new Error(`The passed path "<cyan>${path}</cyan>" must be absolute and cannot be casted automatically`);
        path = __path.resolve(params.rootDir, path);
      }
      return path;
    }
    if (params.tokens && __isNode()) {
      value = __replaceTokens(value);
    }
    if (params.glob) {
      switch (params.glob) {
        case true:
          break;
        case false:
          if (__isGlob(value))
            return new Error(`The passed path "<cyan>${value}</cyan>" is a glob and this is not authorized`);
          break;
        case "resolve":
        case "SFile":
          if (!__isNode())
            return new Error(`The parameter "<magenta>glob: 'resolve'</magenta>" can be used only in a node context`);
          let files = __resolveGlob(value, {
            cwd: params.rootDir
          });
          files = files.map((file) => {
            if (params.glob === "SFile")
              return file;
            if (params.absolute)
              return toAbsolute(file.path);
            return file.path;
          });
          return files;
          break;
      }
    }
    if (!__isPath(value)) {
      return new Error(`The passed path "<cyan>${value}</cyan>" is not a valid path`);
    }
    if (params.exists) {
      if (!__fs.existsSync(value))
        if (params.create) {
          __fs.mkdirSync(value, { recursive: true });
        } else {
          return new Error(`The passed path "<cyan>${value}</cyan>" does not exists and it should`);
        }
    }
    return value;
  }
};
var pathRule_default = ruleObj;
export {
  pathRule_default as default
};
