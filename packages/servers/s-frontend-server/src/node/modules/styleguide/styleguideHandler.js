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
var styleguideHandler_exports = {};
__export(styleguideHandler_exports, {
  default: () => styleguide
});
module.exports = __toCommonJS(styleguideHandler_exports);
var import_s_docmap = __toESM(require("@coffeekraken/s-docmap"), 1);
var import_s_docblock = __toESM(require("@coffeekraken/s-docblock"), 1);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_s_log = __toESM(require("@coffeekraken/s-log"), 1);
var import_s_view_renderer = __toESM(require("@coffeekraken/s-view-renderer"), 1);
var import_s_view_renderer2 = require("@coffeekraken/s-view-renderer");
var import_scrapeUrl = __toESM(require("@coffeekraken/sugar/node/og/scrapeUrl"), 1);
var import_s_bench = __toESM(require("@coffeekraken/s-bench"), 1);
function styleguide(req, res, settings = {}) {
  return new import_s_promise.default(async ({ resolve, reject, emit }) => {
    import_s_bench.default.start("handlers.styleguide");
    import_s_bench.default.step("handlers.styleguide", "beforeDocmapRead");
    const docmap = new import_s_docmap.default();
    const docmapJson = await docmap.read();
    const styleguideMenu = docmapJson.menu.custom.styleguide;
    import_s_bench.default.step("handlers.styleguide", "afterDocmapRead");
    const styleguideObj = styleguideMenu.slug[req.path];
    if (!styleguideObj || !import_fs.default.existsSync(styleguideObj.docmap.path)) {
      const error = await (0, import_s_view_renderer2.page404)(__spreadProps(__spreadValues({}, res.templateData || {}), {
        title: `Styleguide "${req.path}" not found`,
        body: `The styleguide "${req.path}" you requested does not exists...`
      }));
      res.type("text/html");
      res.status(404);
      res.send(error.value);
      return reject(error.value);
    }
    const finalReqPath = `/styleguide/${req.path.split("/styleguide/")[1]}`;
    import_s_bench.default.step("handlers.styleguide", "beforeDocblockParsing");
    const docblocksInstance = new import_s_docblock.default(styleguideObj.docmap.path, {
      docblock: {
        renderMarkdown: false,
        filterByTag: {
          menu: (value) => {
            if (!value || typeof value !== "string")
              return false;
            const parts = value.split(/\s{2,99999999}/);
            if (parts.length >= 2 && parts[1] === finalReqPath)
              return true;
            return false;
          }
        }
      }
    });
    await docblocksInstance.parse();
    const docblocks = docblocksInstance.toObject();
    if (docblocks.length) {
      if (docblocks[0].see) {
        for (let i = 0; i < docblocks[0].see.length; i++) {
          emit("log", {
            type: import_s_log.default.TYPE_INFO,
            value: `<yellow>[og]</yellow> Scraping opengraph from url "<cyan>${docblocks[0].see[i].url}</cyan>"`
          });
          docblocks[0].see[i].og = await (0, import_scrapeUrl.default)(docblocks[0].see[i].url);
        }
      }
    }
    import_s_bench.default.step("handlers.styleguide", "afterDocblockParsing");
    import_s_bench.default.step("handlers.styleguide", "beforeViewRendering");
    const docView = new import_s_view_renderer.default("pages.styleguide.styleguide");
    const pageHtml = await docView.render(__spreadProps(__spreadValues({}, res.templateData || {}), {
      docblocks
    }));
    import_s_bench.default.step("handlers.styleguide", "afterViewRendering");
    import_s_bench.default.end("handlers.styleguide", {}).log();
    res.status(200);
    res.type("text/html");
    res.send(pageHtml.value);
    resolve(pageHtml.value);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
