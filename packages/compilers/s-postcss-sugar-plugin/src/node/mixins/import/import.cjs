var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var import_exports = {};
__export(import_exports, {
  default: () => import_default,
  interface: () => postcssSugarPluginImportInterface
});
module.exports = __toCommonJS(import_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
var import_s_glob = __toESM(require("@coffeekraken/s-glob"), 1);
var import_path = __toESM(require("path"), 1);
var import_dirname = __toESM(require("@coffeekraken/sugar/node/fs/dirname"), 1);
var import_chokidar = __toESM(require("chokidar"), 1);
var import_s_event_emitter = __toESM(require("@coffeekraken/s-event-emitter"), 1);
class postcssSugarPluginImportInterface extends import_s_interface.default {
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
  const dirName = typeof atRule.source.input.file === "string" ? import_path.default.dirname(atRule.source.input.file) : (0, import_dirname.default)();
  const files = import_s_glob.default.resolve(finalParams.path, {
    cwd: dirName
  });
  if (!_watcher) {
    let triggerUpdate = function(path) {
      import_s_event_emitter.default.global.emit("s-postcss-sugar-plugin-import-update", {
        path: import_path.default.resolve(dirName, path)
      });
    };
    const watcher = import_chokidar.default.watch(finalParams.path, {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
