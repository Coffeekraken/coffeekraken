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
var themeDarkBase_config_exports = {};
__export(themeDarkBase_config_exports, {
  default: () => themeDarkBase_config_default
});
module.exports = __toCommonJS(themeDarkBase_config_exports);
function themeDarkBase_config_default(env, config) {
  return {
    extends: "themeBase",
    colorSchemas: {
      default: {
        "0": {
          lighten: 50
        },
        "5": {
          lighten: 45
        },
        "10": {
          lighten: 40
        },
        "15": {
          lighten: 35
        },
        "20": {
          lighten: 30
        },
        "25": {
          lighten: 25
        },
        "30": {
          lighten: 20
        },
        "35": {
          lighten: 15
        },
        "40": {
          lighten: 10
        },
        "45": {
          lighten: 5
        },
        "50": {
          lighten: 0
        },
        "55": {
          darken: 5
        },
        "60": {
          darken: 10
        },
        "65": {
          darken: 15
        },
        "70": {
          darken: 20
        },
        "75": {
          darken: 25
        },
        "80": {
          darken: 30
        },
        "85": {
          darken: 35
        },
        "90": {
          darken: 40
        },
        "95": {
          darken: 48
        },
        "100": {
          darken: 50
        },
        text: {
          lighten: 0
        },
        placeholder: {
          lighten: 50,
          alpha: 0.4
        },
        foreground: {
          lighten: 50
        },
        background: {
          darken: 30
        },
        backgroundForeground: {
          lighten: 50
        },
        surface: {
          darken: 25
        },
        surfaceForeground: {
          lighten: 50
        },
        ui: {
          darken: 20
        },
        uiForeground: {
          lighten: 50
        },
        border: {
          alpha: 0.2
        },
        gradientStart: {
          lighten: 0
        },
        gradientEnd: {
          darken: 20
        }
      }
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
