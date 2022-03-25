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
var themeDefaultLight_config_exports = {};
__export(themeDefaultLight_config_exports, {
  default: () => themeDefaultLight_config_default
});
module.exports = __toCommonJS(themeDefaultLight_config_exports);
function themeDefaultLight_config_default(env, config) {
  return {
    extends: "themeLightBase",
    defaultColor: "main",
    color: {
      base: {
        color: "hsla(198,0,100,1)",
        "...": "[extends.colorSchemas]",
        default: {
          text: {
            darken: 40
          },
          surface: {
            darken: 5
          }
        }
      },
      main: {
        color: "hsla(198,10,50,1)",
        "...": "[extends.colorSchemas]",
        default: {
          text: {
            darken: 10
          },
          surface: {
            lighten: 48
          }
        }
      },
      accent: {
        color: "#ffbb00",
        "...": "[extends.colorSchemas]"
      },
      complementary: {
        color: "#5100ff",
        "...": "[extends.colorSchemas]"
      },
      success: {
        color: "#91ff00",
        "...": "[extends.colorSchemas]",
        default: {
          foreground: {
            darken: 20
          }
        }
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
        "...": "[extends.colorSchemas]",
        default: {
          text: {
            darken: 10
          }
        }
      }
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
