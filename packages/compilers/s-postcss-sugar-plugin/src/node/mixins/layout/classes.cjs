var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var classes_exports = {};
__export(classes_exports, {
  default: () => classes_default,
  interface: () => postcssSugarPluginLayoutClassesInterface
});
module.exports = __toCommonJS(classes_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
var import_s_theme = __toESM(require("@coffeekraken/s-theme"), 1);
var import_unique = __toESM(require("@coffeekraken/sugar/shared/array/unique"), 1);
class postcssSugarPluginLayoutClassesInterface extends import_s_interface.default {
  static get _definition() {
    return {};
  }
}
function classes_default({
  params,
  atRule,
  CssVars,
  replaceWith
}) {
  const finalParams = __spreadValues({}, params);
  const vars = new CssVars();
  const layoutConfig = import_s_theme.default.config("layout");
  const containers = layoutConfig.container;
  Object.keys(containers).forEach((containerName) => {
    const cls = containerName === "default" ? `s-container` : `s-container:${containerName}`;
    vars.comment(() => `/**
      * @name          ${cls}
      * @namespace          sugar.css.layout
      * @type               CssClass
      * @platform       css
      * @status         beta
      * 
      * This class allows you to apply the "<yellow>${containerName}</yellow>" container styling to any HTMLElement
      * 
      * @example        html
      * <div class="${cls.replace(":", ":")}">
      *     <h1 class="s-h1">Hello world</h1>
      * </div>
      */
    `).code(`
      .${cls.replace(":", "--")} {
          @sugar.layout.container(${containerName});
      }`);
  });
  const grids = layoutConfig.grid;
  Object.keys(grids).forEach((id) => {
    const grid = grids[id];
    vars.comment(() => `
        /**
         * @name       s-grid:${id}
         * @namespace     sugar.css.layout
         * @type          CssClass
         * @platform      css
         * @status      beta
         * 
         * This class represent a grid of "<yellow>${id}</yellow> columns"
         * 
         * @example     html
         * <div class="s-container s-grid:${id}">
         *    ${Array(12).map((idx) => {
      return `<div>I'm the grid item ${idx}</div>`;
    }).join("\n")}
        * </div>
        * 
        * @since     2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
      `).code(`
        .s-grid--${id} {
          display: grid;
          grid-template-columns: repeat(${grid}, minmax(0, 1fr));
        }
      `);
  });
  const layouts = layoutConfig.layout;
  Object.keys(layouts).forEach((id) => {
    const layout = layouts[id];
    const colsCount = (0, import_unique.default)(layout.split(/\n\s/)).length;
    vars.comment(() => `
      /**
       * @name       s-layout:${id}
       * @namespace     sugar.css.layout
       * @type          CssClass
       * @platform      css
       * @status      beta
       * 
       * This class represent a layout of "<yellow>${layout}</yellow>"
       * 
       * @example     html
       * <div class="s-container s-layout:${id}">
       *    ${Array(colsCount).map((idx) => {
      return `<div>I'm the area ${idx}</div>`;
    }).join("\n")}
       * </div>
       * 
       * @since     2.0.0
       * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
       */
      `).code(`
      .s-layout--${id} {
        @sugar.layout(${layout}, $scope: bare);
      }
    `);
  });
  const spaces = import_s_theme.default.config("space");
  Object.keys(spaces).forEach((spaceName) => {
    const clsX = `s-layout:gap-x-${spaceName}`.replace("-default", "");
    const clsY = `s-layout:gap-y-${spaceName}`.replace("-default", "");
    const cls = `s-layout:gap-${spaceName}`.replace("-default", "");
    vars.comment(() => `
      /**
       * @name       ${clsX}
       * @namespace     sugar.css.layout
       * @type          CssClass
       * @platform      css
       * @status        beta
       * 
       * This class allows you to apply some left and right gap on your s-layout items
       * 
       * @example     html
       * <div class="s-layout:123 ${clsX.replace(":", ":")}">
       *    ${Array(3).map((idx) => {
      return `<div>I'm the area ${idx}</div>`;
    }).join("\n")}
       * </div>
       * 
       * @since     2.0.0
       * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
       */
      `).code(`
      .${clsX.replace(":", "--")} > * {
        padding-left: sugar.space(${spaceName});
        padding-right: sugar.space(${spaceName});
      }
    `);
    vars.comment(() => `
      /**
       * @name       ${clsY}
       * @namespace     sugar.css.layout
       * @type          CssClass
       * @platform      css
       * @status        beta
       * 
       * This class allows you to apply some left and right gap on your s-layout items
       * 
       * @example     html
       * <div class="s-layout:123 ${clsY.replace(":", ":")}">
       *    ${Array(3).map((idx) => {
      return `<div>I'm the area ${idx}</div>`;
    }).join("\n")}
       * </div>
       * 
       * @since     2.0.0
       * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
       */
      `).code(`
        .${clsY.replace(":", "--")} > * {
        padding-top: sugar.space(${spaceName});
        padding-bottom: sugar.space(${spaceName});
      }
    `);
    vars.comment(() => `
      /**
       * @name       ${cls}
       * @namespace     sugar.css.layout
       * @type          CssClass
       * @platform      css
       * @status      beta
       * 
       * This class allows you to apply some left and right gap on your s-layout items
       * 
       * @example     html
       * <div class="s-layout:123 ${cls.replace(":", ":")}">
       *    ${Array(3).map((idx) => {
      return `<div>I'm the area ${idx}</div>`;
    }).join("\n")}
       * </div>
       * 
       * @since     2.0.0
       * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
       */
      `).code(`
      .${cls.replace(":", "--")} > * {
        padding: sugar.space(${spaceName});
      }
    `);
  });
  vars.comment(() => `
     /**
       * @name       s-layout:gap-between
       * @namespace     sugar.css.layout
       * @type          CssClass
       * @platform      css
       * @status      beta
       * 
       * This class allows you to specify that you want only gaps between layout items
       * 
       * @example     html
       * <div class="s-layout:123 s-layout:gap-between">
       *    ${Array(3).map((idx) => {
    return `<div>I'm the area ${idx}</div>`;
  }).join("\n")}
       * </div>
       * 
       * @since     2.0.0
       * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
       */
      `).code(`
      .s-layout--gap-between > * {
        &:first-child {
          padding-left: 0 !important;
        }
        &:last-child {
          padding-right: 0 !important;
        }
      }
  `);
  ["start", "end", "center", "stretch"].forEach((align) => {
    vars.comment(() => `
      /**
         * @name       s-layout:align-${align}
         * @namespace     sugar.css.layout
         * @type          CssClass
         * @platform      css
         * @status        beta
         * 
         * This allows you to align all the items to "${align}"
         * 
         * @example     html
         * <div class="s-layout:123 s-layout:align-${align}">
         *    ${Array(3).map((idx) => {
      return `<div>I'm the area ${idx}</div>`;
    }).join("\n")}
        * </div>
        * 
        * @since     2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
        .s-layout--align-${align} {
          align-items: ${align};
        }
    `);
  });
  ["start", "end", "center", "stretch"].forEach((justify) => {
    vars.comment(() => `
      /**
         * @name       s-layout:justify-${justify}
         * @namespace     sugar.css.layout
         * @type          CssClass
         * @platform      css
         * @status        beta
         * 
         * This allows you to justify all the items to "${justify}"
         * 
         * @example     html
         * <div class="s-layout:123 s-layout:justify-${justify}">
         *    ${Array(3).map((idx) => {
      return `<div>I'm the area ${idx}</div>`;
    }).join("\n")}
        * </div>
        * 
        * @since     2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
        .s-layout--justify-${justify} {
          justify-items: ${justify};
        }
    `);
  });
  return vars;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
