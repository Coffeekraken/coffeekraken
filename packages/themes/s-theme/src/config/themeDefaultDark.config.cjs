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
var themeDefaultDark_config_exports = {};
__export(themeDefaultDark_config_exports, {
  default: () => themeDefaultDark_config_default
});
module.exports = __toCommonJS(themeDefaultDark_config_exports);
function themeDefaultDark_config_default(env, config) {
  return {
    extends: "themeDarkBase",
    defaultColor: "main",
    color: {
      base: {
        color: "hsla(206,11,21,1)",
        "...": "[extends.colorSchemas]",
        default: {
          text: {
            lighten: 30
          },
          surface: {
            lighten: 5
          }
        }
      },
      main: {
        color: "hsla(198,10,50,1)",
        "...": "[extends.colorSchemas]",
        default: {
          text: {
            lighten: 46
          }
        }
      },
      accent: {
        color: "#ffbb00",
        "...": "[extends.colorSchemas]"
      },
      complementary: {
        color: "#5100ff",
        "...": "[extends.colorSchemas]",
        default: {
          text: {
            lighten: 15
          }
        }
      },
      success: {
        color: "#91ff00",
        "...": "[extends.colorSchemas]"
      },
      warning: {
        color: "#ffd500",
        "...": "[extends.colorSchemas]"
      },
      error: {
        color: "#ff003b",
        "...": "[extends.colorSchemas]"
      },
      info: {
        color: "#00ffff",
        "...": "[extends.colorSchemas]"
      }
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
