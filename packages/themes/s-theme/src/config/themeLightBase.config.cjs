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
var themeLightBase_config_exports = {};
__export(themeLightBase_config_exports, {
  default: () => themeLightBase_config_default
});
module.exports = __toCommonJS(themeLightBase_config_exports);
function themeLightBase_config_default(env, config) {
  return {
    extends: "themeBase",
    colorSchemas: {
      default: {
        "0": {
          darken: 50
        },
        "5": {
          darken: 45
        },
        "10": {
          darken: 40
        },
        "15": {
          darken: 35
        },
        "20": {
          darken: 30
        },
        "25": {
          darken: 25
        },
        "30": {
          darken: 20
        },
        "35": {
          darken: 15
        },
        "40": {
          darken: 10
        },
        "45": {
          darken: 5
        },
        "50": {
          darken: 0
        },
        "55": {
          lighten: 5
        },
        "60": {
          lighten: 10
        },
        "65": {
          lighten: 15
        },
        "70": {
          lighten: 20
        },
        "75": {
          lighten: 25
        },
        "80": {
          lighten: 30
        },
        "85": {
          lighten: 35
        },
        "90": {
          lighten: 40
        },
        "95": {
          lighten: 48
        },
        "100": {
          lighten: 50
        },
        text: {
          darken: 0
        },
        placeholder: {
          darken: 0,
          alpha: 0.2
        },
        foreground: {
          lighten: 50
        },
        background: {
          lighten: 50
        },
        backgroundForeground: {
          darken: 45
        },
        surface: {
          lighten: 35
        },
        surfaceForeground: {
          darken: 45
        },
        ui: {
          lighten: 50
        },
        uiForeground: {
          darken: 25
        },
        border: {
          alpha: 0.2
        },
        gradientStart: {
          lighten: 0
        },
        gradientEnd: {
          lighten: 20
        }
      }
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
