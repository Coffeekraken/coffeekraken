var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var themeUi_config_exports = {};
__export(themeUi_config_exports, {
  default: () => themeUi_config_default
});
module.exports = __toCommonJS(themeUi_config_exports);
var themeUi_config_default = (env, config) => {
  return {
    filtrableInput: {
      paddingInline: "[theme.ui.default.paddingInline]",
      paddingBlock: "[theme.ui.default.paddingBlock]",
      borderRadius: "[theme.ui.default.borderRadius]",
      borderWidth: "[theme.ui.default.borderWidth]",
      transition: "[theme.ui.default.transition]",
      defaultColor: "[theme.ui.default.defaultColor]",
      defaultStyle: "solid",
      depth: 100,
      outline: "[theme.ui.outline.active]",
      rhythmVertical: "[theme.ui.default.rhythmVertical]"
    }
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
