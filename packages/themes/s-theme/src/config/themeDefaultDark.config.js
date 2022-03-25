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
export {
  themeDefaultDark_config_default as default
};
