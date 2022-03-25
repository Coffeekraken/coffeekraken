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
  if (env.platform !== "node")
    return;
  return {
    default: {
      paddingInline: "1.5em",
      paddingBlock: "0.75em",
      borderRadius: "[theme.border.radius.default]",
      borderWidth: "[theme.border.width.default]",
      transition: "[theme.transition.fast]",
      defaultColor: "main",
      defaultStyle: "solid",
      defaultShape: "default",
      depth: "[theme.depth.default]",
      rhythmVertical: {
        "margin-bottom": 60
      }
    },
    form: {
      paddingInline: "0.75em",
      paddingBlock: "0.5em",
      borderRadius: "[theme.border.radius.default]",
      borderWidth: "[theme.border.width.default]",
      transition: "[theme.transition.fast]",
      outline: "[theme.ui.outline.active]",
      defaultColor: "accent",
      defaultStyle: "solid",
      defaultShape: "default",
      depth: "[theme.ui.default.depth]",
      rhythmVertical: {
        "margin-bottom": 40
      }
    },
    outline: {
      active: true,
      borderWidth: "10px",
      borderRadius: "[theme.border.radius.default]",
      transition: "all .2s ease-out"
    },
    scrollbar: {
      size: "2px",
      defaultColor: "accent"
    },
    button: {
      paddingInline: "[theme.ui.default.paddingInline]",
      paddingBlock: "[theme.ui.default.paddingBlock]",
      borderRadius: "[theme.ui.default.borderRadius]",
      borderWidth: "[theme.ui.default.borderWidth]",
      transition: "[theme.ui.default.transition]",
      outline: "[theme.ui.outline.active]",
      depth: "[theme.ui.default.depth]",
      defaultStyle: "[theme.ui.default.defaultStyle]",
      defaultShape: "[theme.ui.default.defaultShape]",
      rhythmVertical: "[theme.ui.default.rhythmVertical]"
    },
    avatar: {
      borderRadius: "[theme.ui.default.borderRadius]",
      borderWidth: "2px",
      transition: "[theme.ui.default.transition]",
      depth: "[theme.ui.default.depth]",
      defaultStyle: "[theme.ui.default.defaultStyle]",
      defaultShape: "[theme.ui.default.defaultShape]",
      rhythmVertical: "[theme.ui.default.rhythmVertical]"
    },
    colorPicker: {
      paddingInline: "[theme.ui.form.paddingInline]",
      paddingBlock: "[theme.ui.form.paddingBlock]",
      borderRadius: "[theme.ui.form.borderRadius]",
      borderWidth: "[theme.ui.form.borderWidth]",
      transition: "[theme.ui.form.transition]",
      defaultColor: "[theme.ui.form.defaultColor]",
      defaultStyle: "[theme.ui.form.defaultStyle]",
      depth: "[theme.ui.form.depth]",
      outline: "[theme.ui.outline.active]",
      rhythmVertical: "[theme.ui.form.rhythmVertical]"
    },
    datePicker: {
      paddingInline: "[theme.ui.form.paddingInline]",
      paddingBlock: "[theme.ui.form.paddingBlock]",
      borderRadius: "[theme.ui.form.borderRadius]",
      borderWidth: "[theme.ui.form.borderWidth]",
      transition: "[theme.ui.form.transition]",
      defaultColor: ["theme.ui.form.defaultColor"],
      defaultStyle: "[theme.ui.form.defaultStyle]",
      depth: "[theme.ui.form.depth]",
      outline: "[theme.ui.outline.active]",
      rhythmVertical: "[theme.ui.form.rhythmVertical]"
    },
    input: {
      paddingInline: "[theme.ui.form.paddingInline]",
      paddingBlock: "[theme.ui.form.paddingBlock]",
      borderRadius: "[theme.ui.form.borderRadius]",
      borderWidth: "[theme.ui.form.borderWidth]",
      transition: "[theme.ui.form.transition]",
      defaultStyle: "solid",
      defaultShape: "[theme.ui.form.defaultShape]",
      depth: "[theme.ui.form.depth]",
      outline: "[theme.ui.outline.active]",
      rhythmVertical: "[theme.ui.form.rhythmVertical]"
    },
    radio: {
      paddingInline: "[theme.ui.form.paddingInline]",
      paddingBlock: "[theme.ui.form.paddingBlock]",
      borderRadius: "0.5em",
      borderWidth: "[theme.ui.form.borderWidth]",
      transition: "[theme.ui.form.transition]",
      depth: "[theme.ui.form.depth]",
      outline: "[theme.ui.outline.active]",
      defaultStyle: "[theme.ui.form.defaultStyle]",
      defaultShape: "[theme.ui.form.defaultShape]",
      rhythmVertical: "[theme.ui.form.rhythmVertical]"
    },
    checkbox: {
      paddingInline: "[theme.ui.form.paddingInline]",
      paddingBlock: "[theme.ui.form.paddingBlock]",
      borderRadius: "0.2em",
      borderWidth: "[theme.ui.form.borderWidth]",
      transition: "[theme.ui.form.transition]",
      depth: "[theme.ui.form.depth]",
      defaultStyle: "[theme.ui.default.defaultStyle]",
      defaultShape: "[theme.ui.default.defaultShape]",
      outline: "[theme.ui.outline.active]",
      rhythmVertical: "[theme.ui.form.rhythmVertical]"
    },
    range: {
      paddingInline: "[theme.ui.form.paddingInline]",
      paddingBlock: "[theme.ui.form.paddingBlock]",
      borderRadius: "[theme.ui.form.borderRadius]",
      borderWidth: "[theme.ui.form.borderWidth]",
      transition: "[theme.ui.form.transition]",
      defaultStyle: "[theme.ui.form.defaultStyle]",
      defaultShape: "[theme.ui.form.defaultShape]",
      depth: "[theme.ui.form.depth]",
      outline: "[theme.ui.outline.active]",
      rhythmVertical: "[theme.ui.form.rhythmVertical]"
    },
    label: {
      paddingInline: "[theme.ui.form.paddingInline]",
      paddingBlock: "[theme.ui.form.paddingBlock]",
      borderRadius: "[theme.ui.form.borderRadius]",
      borderWidth: "[theme.ui.form.borderWidth]",
      transition: "[theme.ui.form.transition]",
      defaultStyle: "inline",
      defaultShape: "[theme.ui.form.defaultShape]",
      depth: "[theme.ui.form.depth]",
      rhythmVertical: "[theme.ui.form.rhythmVertical]"
    },
    select: {
      paddingInline: "[theme.ui.form.paddingInline]",
      paddingBlock: "[theme.ui.form.paddingBlock]",
      borderRadius: "[theme.ui.form.borderRadius]",
      borderWidth: "[theme.ui.form.borderWidth]",
      transition: "[theme.ui.form.transition]",
      depth: "[theme.ui.form.depth]",
      defaultStyle: "[theme.ui.form.defaultStyle]",
      defaultShape: "[theme.ui.form.defaultShape]",
      outline: "[theme.ui.outline.active]",
      rhythmVertical: "[theme.ui.form.rhythmVertical]"
    },
    switch: {
      borderRadius: "[theme.ui.form.borderRadius]",
      borderWidth: "[theme.ui.form.borderWidth]",
      transition: "[theme.ui.default.transition]",
      depth: "[theme.ui.form.depth]",
      defaultStyle: "[theme.ui.form.defaultStyle]",
      defaultShape: "[theme.ui.form.defaultShape]",
      outline: "[theme.ui.outline.active]",
      rhythmVertical: "[theme.ui.form.rhythmVertical]"
    },
    dropdown: {
      paddingInline: "[theme.ui.default.paddingBlock]",
      paddingBlock: "[theme.ui.default.paddingBlock]",
      borderRadius: "[theme.ui.default.borderRadius]",
      borderWidth: 0,
      transition: "[theme.ui.default.transition]",
      defaultStyle: "[theme.ui.default.defaultStyle]",
      defaultShape: "default",
      depth: 50,
      outline: "[theme.ui.outline.active]"
    },
    list: {
      paddingInline: "[theme.ui.default.paddingInline]",
      paddingBlock: "[theme.ui.default.paddingBlock]",
      borderRadius: "[theme.ui.default.borderRadius]",
      borderWidth: "[theme.ui.default.borderWidth]",
      transition: "[theme.ui.default.transition]",
      defaultStyle: "dl",
      depth: "[theme.ui.default.depth]",
      bulletChar: "-",
      rhythmVertical: "[theme.ui.default.rhythmVertical]"
    },
    fsTree: {
      paddingInline: "[theme.ui.default.paddingInline]",
      paddingBlock: "[theme.ui.default.paddingBlock]",
      borderRadius: "[theme.ui.default.borderRadius]",
      borderWidth: "[theme.ui.default.borderWidth]",
      transition: "[theme.ui.default.transition]",
      defaultStyle: "[theme.ui.default.defaultStyle]",
      defaultShape: "[theme.ui.default.defaultShape]",
      depth: "[theme.ui.default.depth]",
      bulletChar: "\u25CF",
      rhythmVertical: "[theme.ui.default.rhythmVertical]"
    },
    tabs: {
      paddingInline: "[theme.ui.default.paddingInline]",
      paddingBlock: "[theme.ui.default.paddingBlock]",
      borderRadius: "[theme.ui.default.borderRadius]",
      borderWidth: "[theme.ui.default.borderWidth]",
      transition: "[theme.ui.default.transition]",
      defaultStyle: "[theme.ui.default.defaultStyle]",
      defaultShape: "[theme.ui.default.defaultShape]",
      depth: "[theme.ui.default.depth]",
      outline: "[theme.ui.outline.active]",
      rhythmVertical: "[theme.ui.default.rhythmVertical]"
    },
    terminal: {
      paddingInline: "[theme.ui.default.paddingInline]",
      paddingBlock: "[theme.ui.default.paddingBlock]",
      borderRadius: "[theme.ui.default.borderRadius]",
      borderWidth: "[theme.ui.default.borderWidth]",
      transition: "[theme.ui.default.transition]",
      defaultColor: "[theme.ui.default.defaultColor]",
      defaultStyle: "[theme.ui.default.defaultStyle]",
      depth: "[theme.ui.default.depth]",
      rhythmVertical: "[theme.ui.default.rhythmVertical]"
    },
    tooltip: {
      paddingInline: "[theme.ui.default.paddingBlock]",
      paddingBlock: "[theme.ui.default.paddingBlock]",
      borderRadius: "[theme.ui.default.borderRadius]",
      borderWidth: "[theme.ui.default.borderWidth]",
      transition: "[theme.ui.default.transition]",
      defaultStyle: "[theme.ui.default.defaultStyle]",
      defaultShape: "[theme.ui.default.defaultShape]",
      depth: "[theme.ui.default.depth]",
      arrowSize: "15px"
    },
    code: {
      paddingInline: "[theme.padding.50]",
      paddingBlock: "[theme.padding.50]",
      borderRadius: "[theme.ui.default.borderRadius]",
      borderWidth: "[theme.ui.default.borderWidth]",
      transition: "[theme.ui.default.transition]",
      defaultColor: "[theme.ui.default.defaultColor]",
      defaultStyle: "[theme.ui.default.defaultStyle]",
      depth: "[theme.ui.default.depth]",
      rhythmVertical: "[theme.ui.default.rhythmVertical]"
    },
    blockquote: {
      paddingInline: "[theme.ui.default.paddingInline]",
      paddingBlock: "[theme.ui.default.paddingBlock]",
      borderRadius: "[theme.ui.default.borderRadius]",
      borderWidth: "[theme.ui.default.borderWidth]",
      transition: "[theme.ui.default.transition]",
      defaultStyle: "[theme.ui.default.defaultStyle]",
      defaultShape: "[theme.ui.default.defaultShape]",
      defaultColor: "accent",
      depth: "[theme.ui.default.depth]",
      rhythmVertical: "[theme.ui.default.rhythmVertical]"
    },
    table: {
      paddingInline: "[theme.ui.default.paddingInline]",
      paddingBlock: "[theme.ui.default.paddingBlock]",
      borderRadius: "[theme.ui.default.borderRadius]",
      borderWidth: "[theme.border.width.10]",
      transition: "[theme.ui.default.transition]",
      defaultStyle: "[theme.ui.default.defaultStyle]",
      defaultShape: "[theme.ui.default.defaultShape]",
      depth: "[theme.ui.default.depth]",
      rhythmVertical: "[theme.ui.default.rhythmVertical]"
    },
    badge: {
      paddingInline: ".65em",
      paddingBlock: ".35em",
      borderRadius: "[theme.ui.default.borderRadius]",
      borderWidth: "[theme.ui.default.borderWidth]",
      transition: "[theme.ui.default.transition]",
      defaultStyle: "[theme.ui.default.defaultStyle]",
      defaultShape: "[theme.ui.default.defaultShape]",
      depth: 0,
      rhythmVertical: "[theme.ui.default.rhythmVertical]"
    },
    loader: {
      duration: "1s",
      easing: "linear"
    },
    loaderSpinner: {
      duration: "[theme.ui.loader.duration]",
      easing: "[theme.ui.loader.easing]"
    },
    loaderRound: {
      duration: "[theme.ui.loader.duration]",
      easing: "[theme.ui.loader.easing]"
    },
    loaderDrop: {
      duration: "[theme.ui.loader.duration]",
      easing: "[theme.ui.loader.easing]"
    }
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
