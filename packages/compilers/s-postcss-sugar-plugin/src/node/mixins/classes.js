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
var classes_exports = {};
__export(classes_exports, {
  default: () => classes_default,
  interface: () => postcssSugarPluginClassesMixinInterface
});
module.exports = __toCommonJS(classes_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
var import_objectHash = __toESM(require("@coffeekraken/sugar/shared/object/objectHash"));
var import_s_theme = __toESM(require("@coffeekraken/s-theme"));
class postcssSugarPluginClassesMixinInterface extends import_s_interface.default {
  static get _definition() {
    return {};
  }
}
async function classes_default({
  params,
  atRule,
  cache,
  sharedData,
  toCache,
  replaceWith
}) {
  const cssArray = [
    "@sugar.reset;",
    "@sugar.ui.classes;",
    "@sugar.typo.classes;",
    "@sugar.layout.classes;",
    "@sugar.clearfix.classes;",
    "@sugar.cursor.classes;",
    "@sugar.color.classes;",
    "@sugar.fit.classes;",
    "@sugar.format.classes;",
    "@sugar.link.classes;",
    "@sugar.gap.classes;",
    "@sugar.height.classes;",
    "@sugar.text.classes;",
    "@sugar.font.classes;",
    "@sugar.depth.classes;",
    "@sugar.disabled.classes;",
    "@sugar.flex.classes;",
    "@sugar.float.classes;",
    "@sugar.ratio.classes;",
    "@sugar.border.classes;",
    "@sugar.display.classes;",
    "@sugar.overflow.classes;",
    "@sugar.position.classes;",
    "@sugar.pointer.classes;",
    "@sugar.transition.classes;",
    "@sugar.margin.classes;",
    "@sugar.offsize.classes;",
    "@sugar.order.classes;",
    "@sugar.opacity.classes;",
    "@sugar.scale.classes;",
    "@sugar.padding.classes;",
    "@sugar.userSelect.classes;",
    "@sugar.visibility.classes;",
    "@sugar.visually.classes;",
    "@sugar.truncate.classes;",
    "@sugar.until.classes;",
    "@sugar.when.classes;",
    "@sugar.scrollbar.classes;",
    "@sugar.width.classes;",
    "@sugar.components.classes;",
    "@sugar.whiteSpace.classes;"
  ];
  const hash = `@sugar.classes.${(0, import_objectHash.default)({
    css: cssArray,
    theme: import_s_theme.default.hash()
  })}`;
  const c = cache("@sugar.classes", hash, cssArray);
  return c;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
