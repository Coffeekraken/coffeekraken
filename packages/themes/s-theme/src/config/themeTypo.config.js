var themeTypo_config_default = (env, config) => {
  return {
    h1: {
      "font-family": "title",
      "font-size": 90,
      "line-height": 1.3,
      "max-width": "55ch",
      rhythmVertical: {
        "margin-bottom": 50
      },
      mobile: {
        "font-size": 70
      }
    },
    h2: {
      "font-family": "title",
      "font-size": 80,
      "line-height": 1.3,
      "max-width": "55ch",
      rhythmVertical: {
        "margin-bottom": 50
      },
      mobile: {
        "font-size": 60
      }
    },
    h3: {
      "font-family": "title",
      "font-size": 70,
      "line-height": 1.3,
      "max-width": "55ch",
      rhythmVertical: {
        "margin-bottom": 50
      },
      mobile: {
        "font-size": 50
      }
    },
    h4: {
      "font-family": "title",
      "font-size": 60,
      "line-height": 1.3,
      "max-width": "55ch",
      rhythmVertical: {
        "margin-bottom": 50
      },
      mobile: {
        "font-size": 40
      }
    },
    h5: {
      "font-family": "title",
      "font-size": 50,
      "line-height": 1.3,
      "max-width": "55ch",
      rhythmVertical: {
        "margin-bottom": 40
      },
      mobile: {
        "font-size": 30
      }
    },
    h6: {
      "font-family": "title",
      "font-size": 40,
      "line-height": 1.3,
      "max-width": "55ch",
      rhythmVertical: {
        "margin-bottom": 40
      },
      mobile: {
        "font-size": 30
      }
    },
    p: {
      "font-family": "default",
      "font-size": 30,
      "line-height": 1.8,
      "max-width": "55ch",
      rhythmVertical: {
        "margin-bottom": 50
      }
    },
    lead: {
      "font-family": "default",
      "font-size": 50,
      "line-height": 1.6,
      "max-width": "55ch",
      rhythmVertical: {
        "margin-bottom": 50
      },
      mobile: {
        "font-size": 40
      }
    },
    hr: {
      color: "[theme.color.main.color]",
      opacity: 0.2,
      rhythmVertical: {
        "margin-bottom": 50
      }
    },
    "pre:not([class])": {
      "font-family": "code",
      color: ["main", "text"],
      "background-color": ["main", "surface"],
      "line-height": 1.5,
      paddingInline: "[theme.ui.default.paddingInline]",
      paddingBlock: "[theme.ui.default.paddingBlock]",
      borderRadius: "[theme.ui.default.borderRadius]",
      depth: "[theme.ui.default.depth]",
      rhythmVertical: {
        "margin-bottom": 50
      }
    },
    "code:not(pre > code)": {
      display: "inline-block",
      "font-family": "code",
      color: ["main", "text"],
      "background-color": ["accent", "surface"],
      borderRadius: 10,
      paddingInline: 10,
      paddingBlock: 0
    },
    a: {
      color: "accent"
    },
    quote: {
      "font-family": "quote"
    },
    b: {
      "font-weight": "bold"
    },
    bold: {
      "font-weight": "bold"
    },
    strong: {
      "font-weight": "bold"
    },
    i: {
      "font-style": "italic"
    },
    italic: {
      "font-style": "italic"
    },
    em: {
      "font-style": "italic"
    },
    large: {
      "font-size": "1.1em"
    },
    larger: {
      "font-size": "1.2em"
    },
    largest: {
      "font-size": "1.3em"
    },
    small: {
      "font-size": "0.9em"
    },
    smaller: {
      "font-size": "0.8em"
    },
    smallest: {
      "font-size": "0.7em"
    },
    mark: {
      "background-color": "[theme.color.accent.color]",
      color: "[theme.color.accent.foreground]"
    },
    del: {
      "text-decoration": "line-through"
    },
    ins: {
      "text-decoration": "underline"
    },
    sub: {
      "vertical-align": "sub",
      "font-size": "0.6em"
    },
    sup: {
      "vertical-align": "sup",
      "font-size": "0.6em"
    }
  };
};
export {
  themeTypo_config_default as default
};
