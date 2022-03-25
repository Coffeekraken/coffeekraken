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
var themeBase_config_exports = {};
__export(themeBase_config_exports, {
  default: () => themeBase_config_default
});
module.exports = __toCommonJS(themeBase_config_exports);
function themeBase_config_default(env, config) {
  return {
    easing: {
      default: "cubic-bezier(0.700, 0.000, 0.305, 0.995)"
    },
    timing: {
      slow: ".6s",
      default: ".3s",
      fast: ".1s"
    },
    transition: {
      slow: "all [theme.timing.slow] [theme.easing.default]",
      default: "all [theme.timing.default] [theme.easing.default]",
      fast: "all [theme.timing.fast] [theme.easing.default]"
    },
    helpers: {
      states: ["mounted", "active", "loading"],
      clearfix: {
        default: "overflow"
      },
      disabled: {
        opacity: 0.4
      },
      truncate: {
        count: 10
      },
      order: {
        count: 20
      }
    },
    layout: {
      container: {
        default: {
          "max-width": "1280px"
        },
        wide: {
          "max-width": "1640px"
        },
        full: {
          "max-width": "none"
        }
      },
      grid: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 10,
        11: 11,
        12: 12
      },
      layout: {
        "1": "1",
        "12": "1 2",
        "1_2": "1 _ 2",
        "21": "2 1",
        "2_1": "2 _ 1",
        "123": "1 2 3",
        "12_3": "1 2 _ 3",
        "1_23": "1 _ 2 3",
        "1_2_3": "1 _ 2 _ 3",
        "321": "3 2 1",
        "32_1": "3 2 _ 1",
        "3_21": "3 _ 2 1",
        "1234": "1 2 3 4",
        "12_34": "1 2 _ 3 4",
        "123_4": "1 2 3 _ 4",
        "1_234": "1 _ 2 3 4",
        "1_2_3_4": "1 _ 2 _ 3 _ 4",
        "122": "1 2 2",
        "221": "2 2 1",
        "112": "1 1 2",
        "211": "2 1 1",
        "1222": "1 2 2 2",
        "2221": "2 2 2 1",
        "1112": "1 1 1 2",
        "12222": "1 2 2 2 2",
        "11112": "1 1 1 1 2",
        "22221": "2 2 2 2 1",
        "122222": "1 2 2 2 2 2",
        "111112": "1 1 1 1 1 2",
        "12345": "1 2 3 4 5",
        "123_45": "1 2 3 _ 4 5",
        "12_345": "1 2 _ 3 4 5",
        "1_2345": "1 _ 2 3 4 5",
        "1234_5": "1 2 3 4 _ 5",
        "1_2_3_4_5": "1 _ 2 _ 3 _ 4 _ 5",
        "123456": "1 2 3 4 5 6"
      }
    },
    ratio: {
      "1": 1,
      "21-9": 21 / 9,
      "16-9": 16 / 9,
      "2-3": 2 / 3,
      "4-3": 4 / 3,
      "3-4": 3 / 4
    },
    scalable: {
      margin: false,
      padding: true,
      offsize: false,
      font: true
    },
    scale: {
      "01": 0.1,
      "02": 0.2,
      "03": 0.3,
      "04": 0.4,
      "05": 0.5,
      "06": 0.6,
      "07": 0.7,
      "08": 0.8,
      "09": 0.9,
      "10": 1,
      "11": 1.1,
      "12": 1.2,
      "13": 1.3,
      "14": 1.4,
      "15": 1.5,
      "16": 1.6,
      "17": 1.7,
      "18": 1.8,
      "19": 1.9,
      "20": 2
    },
    opacity: {
      "0": 0,
      "10": 0.1,
      "20": 0.2,
      "30": 0.3,
      "40": 0.4,
      "50": 0.5,
      "60": 0.6,
      "70": 0.7,
      "80": 0.8,
      "90": 0.9,
      "100": 1
    },
    width: {
      "0": "0",
      "10": "10%",
      "20": "20%",
      "30": "30%",
      "40": "40%",
      "50": "50%",
      "60": "60%",
      "70": "70%",
      "80": "80%",
      "90": "90%",
      "100": "100%"
    },
    height: {
      "0": "0",
      "10": "10%",
      "20": "20%",
      "30": "30%",
      "40": "40%",
      "50": "50%",
      "60": "60%",
      "70": "70%",
      "80": "80%",
      "90": "90%",
      "100": "100%"
    },
    depth: {
      default: "[theme.depth.0]",
      0: "0",
      10: `0px 0.6px 0.4px rgba(0, 0, 0, 0.006),
  0px 1.3px 1px rgba(0, 0, 0, 0.008),
  0px 2.5px 1.9px rgba(0, 0, 0, 0.01),
  0px 4.5px 3.4px rgba(0, 0, 0, 0.012),
  0px 8.4px 6.3px rgba(0, 0, 0, 0.014),
  0px 20px 15px rgba(0, 0, 0, 0.02)`,
      20: `0px 0.6px 0.4px rgba(0, 0, 0, 0.006),
  0px 1.3px 1px rgba(0, 0, 0, 0.008),
  0px 2.5px 1.9px rgba(0, 0, 0, 0.01),
  0px 4.5px 3.4px rgba(0, 0, 0, 0.012),
  0px 8.4px 6.3px rgba(0, 0, 0, 0.014),
  0px 20px 15px rgba(0, 0, 0, 0.02)`,
      30: `0px 0.6px 0.4px rgba(0, 0, 0, 0.008),
  0px 1.3px 1px rgba(0, 0, 0, 0.012),
  0px 2.5px 1.9px rgba(0, 0, 0, 0.015),
  0px 4.5px 3.4px rgba(0, 0, 0, 0.018),
  0px 8.4px 6.3px rgba(0, 0, 0, 0.022),
  0px 20px 15px rgba(0, 0, 0, 0.03)`,
      40: `0px 0.8px 0.6px rgba(0, 0, 0, 0.008),
  0px 2px 1.3px rgba(0, 0, 0, 0.012),
  0px 3.8px 2.5px rgba(0, 0, 0, 0.015),
  0px 6.7px 4.5px rgba(0, 0, 0, 0.018),
  0px 12.5px 8.4px rgba(0, 0, 0, 0.022),
  0px 30px 20px rgba(0, 0, 0, 0.03)`,
      50: `0px 1px 0.8px rgba(0, 0, 0, 0.011),
  0px 2.3px 2px rgba(0, 0, 0, 0.016),
  0px 4.4px 3.8px rgba(0, 0, 0, 0.02),
  0px 7.8px 6.7px rgba(0, 0, 0, 0.024),
  0px 14.6px 12.5px rgba(0, 0, 0, 0.029),
  0px 35px 30px rgba(0, 0, 0, 0.04)`,
      60: `0px 1px 0.7px rgba(0, 0, 0, 0.011),
  0px 2.3px 1.7px rgba(0, 0, 0, 0.016),
  0px 4.4px 3.1px rgba(0, 0, 0, 0.02),
  0px 7.8px 5.6px rgba(0, 0, 0, 0.024),
  0px 14.6px 10.4px rgba(0, 0, 0, 0.029),
  0px 35px 25px rgba(0, 0, 0, 0.04)`,
      70: `0px 1.1px 0.8px rgba(0, 0, 0, 0.011),
  0px 2.7px 2px rgba(0, 0, 0, 0.016),
  0px 5px 3.8px rgba(0, 0, 0, 0.02),
  0px 8.9px 6.7px rgba(0, 0, 0, 0.024),
  0px 16.7px 12.5px rgba(0, 0, 0, 0.029),
  0px 40px 30px rgba(0, 0, 0, 0.04)`,
      80: `0px 1.1px 1px rgba(0, 0, 0, 0.011),
  0px 2.7px 2.3px rgba(0, 0, 0, 0.016),
  0px 5px 4.4px rgba(0, 0, 0, 0.02),
  0px 8.9px 7.8px rgba(0, 0, 0, 0.024),
  0px 16.7px 14.6px rgba(0, 0, 0, 0.029),
  0px 40px 35px rgba(0, 0, 0, 0.04)`,
      90: `0px 1.4px 1.1px rgba(0, 0, 0, 0.011),
  0px 3.3px 2.7px rgba(0, 0, 0, 0.016),
  0px 6.1px 5px rgba(0, 0, 0, 0.02),
  0px 10.9px 8.9px rgba(0, 0, 0, 0.024),
  0px 20.5px 16.7px rgba(0, 0, 0, 0.029),
  0px 49px 40px rgba(0, 0, 0, 0.04)`,
      100: `0px 1.4px 1.4px rgba(0, 0, 0, 0.011),
  0px 3.3px 3.5px rgba(0, 0, 0, 0.016),
  0px 6.1px 6.5px rgba(0, 0, 0, 0.02),
  0px 10.9px 11.6px rgba(0, 0, 0, 0.024),
  0px 20.5px 21.7px rgba(0, 0, 0, 0.029),
  0px 49px 52px rgba(0, 0, 0, 0.04)`
    },
    color: {},
    size: {
      default: "16px",
      0: "0.25rem",
      5: "0.5rem",
      10: "0.65rem",
      15: "0.7rem",
      20: "0.75rem",
      25: "0.9rem",
      30: "1.1rem",
      40: "1.25rem",
      50: "1.50em",
      60: "2rem",
      70: "2.5rem",
      80: "3rem",
      90: "4rem",
      100: "5rem"
    },
    font: {
      family: {
        default: {
          "font-family": '"Titillium Web"',
          "font-weight": 400,
          import: "https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400&display=swap"
        },
        title: {
          "font-family": '"Titillium Web"',
          "font-weight": 600,
          import: "https://fonts.googleapis.com/css2?family=Titillium+Web:wght@600&display=swap"
        },
        quote: {
          "font-family": '"Palatino, Times, Georgia, serif"',
          "font-weight": "normal",
          "font-style": "normal",
          "font-display": "auto",
          "cap-height": 0.65
        },
        code: {
          "font-family": "Menlo, Monaco, Consolas, Courier New, monospace",
          "font-weight": "normal",
          "font-style": "normal",
          "font-display": "auto",
          "cap-height": 0.65
        }
      },
      size: {
        default: "[theme.size.default]",
        0: "[theme.size.0]",
        5: "[theme.size.5]",
        10: "[theme.size.10]",
        20: "[theme.size.20]",
        30: "[theme.size.30]",
        40: "[theme.size.40]",
        50: "[theme.size.50]",
        60: "[theme.size.60]",
        70: "[theme.size.70]",
        80: "[theme.size.80]",
        90: "[theme.size.90]",
        100: "[theme.size.100]"
      }
    },
    border: {
      width: {
        default: "[theme.border.width.10]",
        0: "0px",
        10: "1px",
        20: "2px",
        30: "4px",
        40: "6px",
        50: "8px",
        60: "12px",
        70: "16px",
        80: "20px",
        90: "24px",
        100: "30px"
      },
      radius: {
        default: "5px",
        0: "0",
        10: "4px",
        20: "8px",
        30: "12px",
        40: "16px",
        50: "20px",
        60: "26px",
        70: "32px",
        80: "40px",
        90: "50px",
        100: "60px"
      }
    },
    space: {
      default: "3rem",
      0: "0",
      10: "0.375rem",
      20: "0.75rem",
      30: "1.5rem",
      40: "2.25rem",
      50: "3rem",
      60: "3.75rem",
      70: "4.5rem",
      80: "5.25rem",
      90: "6rem",
      100: "6.75rem"
    },
    margin: {
      default: "[theme.space.default]",
      0: "[theme.space.0]",
      10: "[theme.space.10]",
      20: "[theme.space.20]",
      30: "[theme.space.30]",
      40: "[theme.space.40]",
      50: "[theme.space.50]",
      60: "[theme.space.60]",
      70: "[theme.space.70]",
      80: "[theme.space.80]",
      90: "[theme.space.90]",
      100: "[theme.space.100]"
    },
    padding: {
      default: "[theme.space.default]",
      0: "[theme.space.0]",
      10: "[theme.space.10]",
      20: "[theme.space.20]",
      30: "[theme.space.30]",
      40: "[theme.space.40]",
      50: "[theme.space.50]",
      60: "[theme.space.60]",
      70: "[theme.space.70]",
      80: "[theme.space.80]",
      90: "[theme.space.90]",
      100: "[theme.space.100]"
    },
    offsize: {
      default: "[theme.space.default]",
      0: "[theme.space.0]",
      10: "[theme.space.10]",
      20: "[theme.space.20]",
      30: "[theme.space.30]",
      40: "[theme.space.40]",
      50: "[theme.space.50]",
      60: "[theme.space.60]",
      70: "[theme.space.70]",
      80: "[theme.space.80]",
      90: "[theme.space.90]",
      100: "[theme.space.100]"
    },
    media: {
      defaultAction: ">=",
      defaultQuery: "screen",
      queries: {
        mobile: {
          "min-width": 0,
          "max-width": 639
        },
        tablet: {
          "min-width": 640,
          "max-width": 1279
        },
        desktop: {
          "min-width": 1280,
          "max-width": 2047
        },
        wide: {
          "min-width": 2048,
          "max-width": null
        },
        dwarf: {
          "min-height": null,
          "max-height": 700
        }
      }
    },
    components: {
      "s-code-example": {
        rhythmVertical: "[theme.ui.default.rhythmVertical]"
      }
    },
    ui: "[config.themeUi]",
    typo: "[config.themeTypo]"
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
