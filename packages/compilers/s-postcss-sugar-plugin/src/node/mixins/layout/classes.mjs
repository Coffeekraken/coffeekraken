import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
import __unique from "@coffeekraken/sugar/shared/array/unique";
class postcssSugarPluginLayoutClassesInterface extends __SInterface {
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
  const layoutConfig = __STheme.config("layout");
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
    const colsCount = __unique(layout.split(/\n\s/)).length;
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
  const spaces = __STheme.config("space");
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
export {
  classes_default as default,
  postcssSugarPluginLayoutClassesInterface as interface
};
