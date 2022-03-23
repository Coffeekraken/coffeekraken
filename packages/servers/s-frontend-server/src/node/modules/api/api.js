var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var api_exports = {};
__export(api_exports, {
  default: () => api
});
module.exports = __toCommonJS(api_exports);
var import_s_docmap = __toESM(require("@coffeekraken/s-docmap"), 1);
var import_dirname = __toESM(require("@coffeekraken/sugar/node/fs/dirname"), 1);
var import_set = __toESM(require("@coffeekraken/sugar/shared/object/set"), 1);
async function api(express, settings, config) {
  config.handlers.api = {
    description: "Handler that display the api documentation",
    path: `${(0, import_dirname.default)()}/apiHandler`
  };
  const docmap = new import_s_docmap.default();
  const docmapJson = await docmap.read();
  const apiMenu = {};
  Object.keys(docmapJson.map).forEach((namespace) => {
    const docmapObj = docmapJson.map[namespace];
    const url = `/api/${namespace}`;
    (0, import_set.default)(apiMenu, namespace, {
      type: docmapObj.type,
      name: docmapObj.name,
      namespace,
      url,
      path: docmapObj.path,
      relPath: docmapObj.relPath
    });
    config.routes[url] = {
      handler: "api"
    };
  });
  return true;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
