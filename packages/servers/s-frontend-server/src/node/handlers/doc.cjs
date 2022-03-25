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
var doc_exports = {};
__export(doc_exports, {
  default: () => doc
});
module.exports = __toCommonJS(doc_exports);
var import_s_docblock = __toESM(require("@coffeekraken/s-docblock"));
var import_s_docmap = __toESM(require("@coffeekraken/s-docmap"));
var import_s_promise = __toESM(require("@coffeekraken/s-promise"));
var import_s_view_renderer = __toESM(require("@coffeekraken/s-view-renderer"));
var import_scrapeUrl = __toESM(require("@coffeekraken/sugar/node/og/scrapeUrl"));
let _docmapJson;
function doc(req, res, settings = {}) {
  return new import_s_promise.default(async ({ resolve, reject, pipe }) => {
    const docMap = new import_s_docmap.default();
    const requestedNamespace = req.params["0"].trim();
    const readPromise = docMap.read();
    pipe(readPromise);
    _docmapJson = await readPromise;
    if (!_docmapJson.map[requestedNamespace]) {
      const html = await (0, import_s_view_renderer.page404)(__spreadProps(__spreadValues({}, res.templateData || {}), {
        title: `Documentation "${requestedNamespace}" not found`,
        body: `The documentation "${requestedNamespace}" you requested does not exists...`
      }));
      res.type("text/html");
      res.status(404);
      res.send(html.value);
      return reject(html.value);
    }
    const docblocksInstance = new import_s_docblock.default(_docmapJson.map[requestedNamespace].path, {});
    await docblocksInstance.parse();
    const docblocks = docblocksInstance.toObject();
    if (!docblocks.length) {
      const html = await (0, import_s_view_renderer.page404)(__spreadProps(__spreadValues({}, res.templateData || {}), {
        title: `Documentation "${requestedNamespace}" not found`,
        body: `The documentation "${requestedNamespace}" you requested does not exists...`
      }));
      res.type("text/html");
      res.status(404);
      res.send(html.value);
      return reject(html.value);
    }
    await new Promise((resolve2, reject2) => {
      let pendingRequests = 0;
      docblocks.forEach((block, i) => {
        if (block.see) {
          block.see.forEach((seeObj, j) => {
            pendingRequests++;
            (0, import_scrapeUrl.default)(seeObj.url).then((results) => {
              seeObj.og = results;
              pendingRequests--;
              if (!pendingRequests) {
                resolve2();
              }
            }).catch((error) => {
              pendingRequests--;
              if (!pendingRequests) {
                resolve2();
              }
            });
          });
        } else {
          if (i === docblocks.length - 1 && !pendingRequests) {
            resolve2();
          }
        }
      });
    });
    const docView = new import_s_view_renderer.default("pages.doc.doc");
    const pageHtml = await docView.render(__spreadProps(__spreadValues({}, res.templateData || {}), {
      docblocks
    }));
    res.type("text/html");
    res.status(200);
    res.send(pageHtml.value);
    resolve(pageHtml.value);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
