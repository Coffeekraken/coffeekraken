var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
var apiHandler_exports = {};
__export(apiHandler_exports, {
  default: () => api
});
module.exports = __toCommonJS(apiHandler_exports);
var import_namespaceCompliant = __toESM(require("@coffeekraken/sugar/shared/string/namespaceCompliant"));
var import_s_docmap = __toESM(require("@coffeekraken/s-docmap"));
var import_s_docblock = __toESM(require("@coffeekraken/s-docblock"));
var import_s_promise = __toESM(require("@coffeekraken/s-promise"));
var import_fs = __toESM(require("fs"));
var import_s_view_renderer = __toESM(require("@coffeekraken/s-view-renderer"));
var import_s_view_renderer2 = require("@coffeekraken/s-view-renderer");
function api(req, res, settings = {}) {
  return new import_s_promise.default(async ({ resolve, reject }) => {
    const docmap = new import_s_docmap.default();
    const docmapJson = await docmap.read();
    const namespace = req.path.replace(/^\/api\//, "").trim();
    const docmapObj = docmapJson.map[namespace];
    if (!docmapObj || !import_fs.default.existsSync(docmapObj.path)) {
      const error = await (0, import_s_view_renderer2.page404)(__spreadProps(__spreadValues({}, res.templateData || {}), {
        title: `API "${req.path}" not found`,
        body: `The API item "${req.path}" you requested does not exists...`
      }));
      res.type("text/html");
      res.status(404);
      res.send(error.value);
      return reject(error.value);
    }
    const docblocksInstance = new import_s_docblock.default(docmapObj.path, {
      docblock: {
        renderMarkdown: true,
        filter: (docblock) => {
          if ((0, import_namespaceCompliant.default)(`${docblock.namespace}.${docblock.name}`) === namespace) {
            return true;
          }
          return false;
        }
      }
    });
    await docblocksInstance.parse();
    const docblocks = docblocksInstance.toObject();
    const docView = new import_s_view_renderer.default("pages.api.api");
    const pageHtml = await docView.render(__spreadProps(__spreadValues({}, res.templateData || {}), {
      docblocks
    }));
    res.status(200);
    res.type("text/html");
    res.send(pageHtml.value);
    resolve(pageHtml.value);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
