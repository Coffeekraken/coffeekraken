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
export {
  themeDefaultLight_config_default as default
};
