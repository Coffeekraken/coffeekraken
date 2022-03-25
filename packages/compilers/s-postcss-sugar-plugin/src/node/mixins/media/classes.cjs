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
var classes_exports = {};
__export(classes_exports, {
  default: () => classes_default,
  interface: () => postcssSugarPluginMediaClassesMixinInterface
});
module.exports = __toCommonJS(classes_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
var import_s_theme = __toESM(require("@coffeekraken/s-theme"), 1);
class postcssSugarPluginMediaClassesMixinInterface extends import_s_interface.default {
  static get _definition() {
    return {
      query: {
        type: "String",
        default: Object.keys(import_s_theme.default.config("media.queries")).join(",")
      },
      mediasOnly: {
        type: "Boolean"
      }
    };
  }
}
function classes_default({
  params,
  atRule,
  getCacheFilePath,
  getRoot,
  postcssApi,
  registerPostProcessor,
  replaceWith
}) {
  const finalParams = __spreadValues({
    query: "",
    mediasOnly: false
  }, params);
  const mediaConfig = import_s_theme.default.config("media");
  const medias = finalParams.query ? finalParams.query.split(" ").map((l) => l.trim()) : Object.keys(mediaConfig.queries);
  atRule.replaceWith(`
        /* S-MEDIA-CLASSES:${medias.join(",")} */
        ${atRule.nodes.map((node) => node.toString())}
        /* S-END-MEDIA-CLASSES:${medias.join(",")} */
    `);
  registerPostProcessor((root) => {
    const mediaNodes = [];
    let currentMedias = [];
    root.nodes.forEach((node, i) => {
      if (node.type === "comment" && node.text.includes("S-MEDIA-CLASSES:")) {
        const medias2 = node.text.replace("S-MEDIA-CLASSES:", "").split(",").map((l) => l.trim());
        currentMedias = medias2;
        mediaNodes.push({
          nodes: [],
          medias: medias2
        });
      } else if (node.type === "comment" && node.text.includes("S-END-MEDIA-CLASSES:")) {
        const medias2 = node.text.replace("S-END-MEDIA-CLASSES:", "").split(",").map((l) => l.trim());
        currentMedias = [];
      } else if (currentMedias.length) {
        const mediaNodeObj = mediaNodes.slice(-1)[0];
        mediaNodeObj.nodes.push(node.clone());
      }
    });
    mediaNodes.forEach((mediaObj) => {
      mediaObj.medias.forEach((media) => {
        const mediaRule = new postcssApi.AtRule({
          name: "media",
          params: import_s_theme.default.buildMediaQuery(media).replace("@media ", "")
        });
        mediaObj.nodes.forEach((node) => {
          node = node.clone();
          if (node.type === "comment")
            return;
          if (node.selector === ":root")
            return;
          if (!node.selector) {
            mediaRule.append(node);
          } else {
            let sels = node.selector.split(",").map((l) => l.trim());
            sels = sels.map((sel) => {
              const selectors = sel.match(/\.[a-zA-Z0-9_-]+/gm);
              if (!selectors)
                return sel;
              selectors.forEach((selector) => {
                sel = sel.replace(selector, `${selector}___${media}`);
              });
              return sel;
            });
            node.selector = sels.join(",");
            mediaRule.append(node);
          }
        });
        root.append(mediaRule);
      });
    });
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
