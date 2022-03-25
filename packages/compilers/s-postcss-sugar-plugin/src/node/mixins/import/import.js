var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import __SInterface from "@coffeekraken/s-interface";
import __SGlob from "@coffeekraken/s-glob";
import __path from "path";
import __dirname from "@coffeekraken/sugar/node/fs/dirname";
import __chokidar from "chokidar";
import __SEventEmitter from "@coffeekraken/s-event-emitter";
class postcssSugarPluginImportInterface extends __SInterface {
  static get _definition() {
    return {
      path: {
        type: "String",
        required: true
      },
      media: {
        type: "String"
      }
    };
  }
}
let _watcher;
function import_default({
  params,
  atRule,
  postcss,
  registerPostProcessor,
  settings
}) {
  const finalParams = __spreadValues({}, params);
  const dirName = typeof atRule.source.input.file === "string" ? __path.dirname(atRule.source.input.file) : __dirname();
  const files = __SGlob.resolve(finalParams.path, {
    cwd: dirName
  });
  if (!_watcher) {
    let triggerUpdate = function(path) {
      __SEventEmitter.global.emit("s-postcss-sugar-plugin-import-update", {
        path: __path.resolve(dirName, path)
      });
    };
    const watcher = __chokidar.watch(finalParams.path, {
      cwd: dirName,
      ignoreInitial: true
    });
    watcher.on("change", (path) => {
      triggerUpdate(path);
    });
    watcher.on("add", (path) => {
      triggerUpdate(path);
    });
    watcher.on("unlink", (path) => {
      triggerUpdate(path);
    });
  }
  const commentRule = postcss.parse(`/* S */`);
  atRule.parent.insertAfter(atRule, commentRule);
  files.forEach((file) => {
    let newRule = postcss.parse(`@import "${file.relPath}";`);
    if (settings.target === "vite") {
      newRule = postcss.parse(`@import url("${file.relPath}");`);
    }
    newRule.source.input.file = atRule.source.input.file;
    atRule.parent.insertBefore(atRule, newRule);
  });
  atRule.remove();
}
export {
  import_default as default,
  postcssSugarPluginImportInterface as interface
};
