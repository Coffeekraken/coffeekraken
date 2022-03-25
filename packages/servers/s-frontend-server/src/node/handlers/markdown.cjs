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
var markdown_exports = {};
__export(markdown_exports, {
  default: () => markdown
});
module.exports = __toCommonJS(markdown_exports);
var import_s_docmap = __toESM(require("@coffeekraken/s-docmap"));
var import_s_promise = __toESM(require("@coffeekraken/s-promise"));
var import_s_view_renderer = __toESM(require("@coffeekraken/s-view-renderer"));
var import_s_markdown_builder = __toESM(require("@coffeekraken/s-markdown-builder"));
var import_s_view_renderer2 = require("@coffeekraken/s-view-renderer");
function markdown(req, res, settings = {}) {
  return new import_s_promise.default(async ({ resolve, reject, pipe, pipeErrors }) => {
    var _a, _b;
    const docmap = new import_s_docmap.default();
    const docmapJson = await docmap.read();
    const menu = docmapJson.menu;
    let html;
    let slugObj = menu.slug[req.url];
    if (!slugObj) {
      Object.keys((_a = menu.packages) != null ? _a : {}).forEach((packageName) => {
        if (slugObj)
          return;
        const packageObj = menu.packages[packageName];
        slugObj = packageObj.slug[req.url];
      });
    }
    if (slugObj) {
      const builder = new import_s_markdown_builder.default();
      const res2 = await pipe(builder.build({
        inPath: slugObj.docmap.path,
        target: "html",
        save: false
      }));
      if (res2 instanceof Error) {
        throw res2;
      }
      html = res2[0].code;
    }
    if (!html) {
      const error = await (0, import_s_view_renderer2.page404)(__spreadProps(__spreadValues({}, res.templateData || {}), {
        title: `Markdown "${req.url}" not found`,
        body: `The markdown "${req.url}" you requested does not exists...`
      }));
      res.type("text/html");
      res.status(404);
      res.send(error.value);
      return reject(error.value);
    }
    const viewInstance = new import_s_view_renderer.default("pages.markdown.markdown");
    const result = await viewInstance.render(__spreadProps(__spreadValues({}, (_b = res.templateData) != null ? _b : {}), {
      body: html
    }));
    res.status(200);
    res.type("text/html");
    res.send(result.value);
    resolve(result.value);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
