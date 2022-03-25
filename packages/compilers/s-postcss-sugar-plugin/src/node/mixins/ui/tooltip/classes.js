var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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
import __SInterface from "@coffeekraken/s-interface";
import __faker from "faker";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginUiTooltipClassesInterface extends __SInterface {
  static get _definition() {
    return {
      styles: {
        type: "String[]",
        values: ["solid"],
        default: ["solid"]
      },
      shapes: {
        type: "String[]",
        values: ["default", "square", "pill"],
        default: ["default", "square", "pill"]
      },
      defaultStyle: {
        type: "String",
        values: ["solid"],
        default: __STheme.config("ui.tooltip.defaultStyle")
      },
      defaultShape: {
        type: "String",
        values: ["default", "square", "pill"],
        default: __STheme.config("ui.tooltip.defaultShape")
      },
      scope: {
        type: {
          type: "Array<String>",
          splitChars: [",", " "]
        },
        values: ["bare", "lnf", "shape", "vr", "tf"],
        default: ["bare", "lnf", "shape", "vr", "tf"]
      }
    };
  }
}
import __dirname from "@coffeekraken/sugar/node/fs/dirname";
function dependencies() {
  return {
    files: [`${__dirname()}/tooltip.js`]
  };
}
function classes_default({
  params,
  atRule,
  CssVars,
  replaceWith
}) {
  const finalParams = __spreadValues({
    styles: [],
    shapes: [],
    defaultStyle: "solid",
    defaultShape: "default",
    scope: []
  }, params);
  const vars = new CssVars();
  vars.comment(() => `
      /**
        * @name          Tooltips
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/tooltip
        * @platform       css
        * @status       beta
        * 
        * These classes allows you display nice tooltips on any HTMLElement
        * 
        * @cssClass             s-tooltip-container             Allows to hide and show your tooltip on hover (focus)
        * @cssClass             s-tooltip-container:active     Allow to display a tooltip without having the need of the user interaction
        * @cssClass             s-tooltip                       Apply on the element you want as a tooltip
        ${finalParams.styles.map((style) => {
    return ` * @cssClass     s-tooltip${style === finalParams.defaultStyle ? "" : `:${style}`}           Apply the ${style} tooltip style`;
  }).join("\n")}
        ${finalParams.shapes.map((shape) => {
    return ` * @cssClass     s-tooltip${shape === finalParams.defaultShape ? "" : `:${shape}`}           Apply the ${shape} tooltip shape`;
  }).join("\n")}
        * @cssClass             s-tooltip:top                 Align your tooltip at "top". This is the default. Only then not using the "s-floating" feature       
        * @cssClass             s-tooltip:right               Align your tooltip at "right". Only then not using the "s-floating" feature
        * @cssClass             s-tooltip:left               Align your tooltip at "left". Only then not using the "s-floating" feature
        * @cssClass             s-tooltip:bottom               Align your tooltip at "bottom". Only then not using the "s-floating" feature
        * @cssClass             s-tooltip:interactive          Allow the user to interact with the tooltip. Only then not using the "s-floating" feature
        * 
        ${finalParams.styles.map((style) => {
    return ` * @example        html       ${style}
                *   <span class="s-tooltip-container">
                *       <a class="s-btn s-color:accent s-mie:20 s-mbe:20">Hover me!</a>
                *       <div class="s-white-space:nowrap s-tooltip${finalParams.defaultStyle === style ? "" : `:${style}`} s-color:accent" s-floating>
                *           ${__faker.name.title()} ${__faker.name.findName()}
                *       </div>
                *   </span>
                *   <span class="s-tooltip-container">
                *       <a class="s-btn s-color:accent s-mie:20 s-mbe:20">Hover me!</a>
                *       <div class="s-white-space:nowrap s-tooltip${finalParams.defaultStyle === style ? "" : `:${style}`} s-color:complementary" s-floating>
                *           ${__faker.name.title()} ${__faker.name.findName()}
                *       </div>
                *   </span>
                *   <span class="s-tooltip-container">
                *       <a class="s-btn s-color:accent s-mie:20 s-mbe:20">Hover me!</a>
                *       <div class="s-white-space:nowrap s-tooltip${finalParams.defaultStyle === style ? "" : `:${style}`} s-color:info" s-floating>
                *           ${__faker.name.title()} ${__faker.name.findName()}
                *       </div>
                *   </span>
            `;
  })}
        *
        ${finalParams.shapes.map((shape) => {
    return ` * @example        html       ${shape}
                *   <span class="s-tooltip-container">
                *       <a class="s-btn s-color:accent s-mie:20 s-mbe:20">Hover me!</a>
                *       <div class="s-white-space:nowrap s-tooltip${finalParams.defaultShape === shape ? "" : `:${shape}`} s-color:accent" s-floating>
                *           ${__faker.name.title()} ${__faker.name.findName()}
                *       </div>
                *   </span>
                *   <span class="s-tooltip-container">
                *       <a class="s-btn s-color:accent s-mie:20 s-mbe:20">Hover me!</a>
                *       <div class="s-white-space:nowrap s-tooltip${finalParams.defaultShape === shape ? "" : `:${shape}`} s-color:complementary" s-floating>
                *           ${__faker.name.title()} ${__faker.name.findName()}
                *       </div>
                *   </span>
                *   <span class="s-tooltip-container">
                *       <a class="s-btn s-color:accent s-mie:20 s-mbe:20">Hover me!</a>
                *       <div class="s-white-space:nowrap s-tooltip${finalParams.defaultShape === shape ? "" : `:${shape}`} s-color:info" s-floating>
                *           ${__faker.name.title()} ${__faker.name.findName()}
                *       </div>
                *   </span>
            `;
  })}
        * 
        * @example      html        Positions (no s-floating feature)
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-color:accent s-mie:20 s-mbe:20">Block start (default)</a>
        *       <div class="s-tooltip s-white-space:nowrap s-color:accent">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-color:accent s-mie:20 s-mbe:20">Inline end</a>
        *       <div class="s-tooltip:right s-white-space:nowrap s-color:accent">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-color:accent s-mie:20 s-mbe:20">Block end</a>
        *       <div class="s-tooltip:bottom s-white-space:nowrap s-color:accent">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-color:accent s-mie:20 s-mbe:20">Inline start</a>
        *       <div class="s-tooltip:left s-white-space:nowrap s-color:accent">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        * 
        * @example      html        Colors (none-exhaustive)
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-color:accent s-mie:20 s-mbe:20">Accent</a>
        *       <div class="s-tooltip s-white-space:nowrap s-color:accent" s-floating>
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-color:accent s-mie:20 s-mbe:20">Complementary</a>
        *       <div class="s-tooltip s-white-space:nowrap s-color:complementary" s-floating>
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-color:accent s-mie:20 s-mbe:20">Error</a>
        *       <div class="s-tooltip s-white-space:nowrap s-color:error" s-floating>
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-color:accent s-mie:20 s-mbe:20">Info</a>
        *       <div class="s-tooltip s-white-space:nowrap s-color:info" s-floating>
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        * 
        * @example      html        Interactive
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-color:accent s-mie:20 s-mbe:20">I'm not interactive</a>
        *       <div class="s-tooltip s-white-space:nowrap">
        *           <a class="s-btn s-color:accent">Click me if you can!</a>
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-color:accent s-mie:20 s-mbe:20">I'm interactive</a>
        *       <div class="s-tooltip:interactive s-white-space:nowrap">
        *           <a class="s-btn s-color:accent">Click me because you can!</a>
        *       </div>
        *   </span>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  if (finalParams.scope.includes("bare")) {
    vars.comment(() => `/**
            * @name           s-toolip-container
            * @namespace      sugar.css.ui.tooltip
            * @type           CssClass
            * 
            * This class represent the tooltip container in which you have to put your actual .s-tooltip element
            * and anything you want as a tooltip activator. Can be a button, an image, really anything
            * 
            * @example        html
            * <div class="s-tooltip-container">
            *   <img src="..." />
            *   <div class="s-tooltip">Something cool</div>
            * </div>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */`);
    vars.code(() => `
            .s-tooltip-container {
                position: relative;
                display: inline-block;

                & > .s-tooltip {
                    opacity: 0;
                }

                &:focus,
                &:focus-within,
                &:hover {
                    & > .s-tooltip--interactive {
                        pointer-events: all;
                        opacity: 1;
                    }
                }

                &:focus > .s-tooltip,
                &:focus-within > .s-tooltip,
                .s-tooltip:focus,
                &:hover > .s-tooltip {
                    opacity: 1;
                }
            }
        `);
    vars.comment(() => `/**
            * @name           s-toolip-container:active
            * @namespace      sugar.css.ui.tooltip
            * @type           CssClass
            * 
            * This class allows you to display a tooltip inside a tooltip container without needing hover by the user
            * 
            * @example        html
            * <div class="s-tooltip-container:active">
            *   <img src="..." />
            *   <div class="s-tooltip">Something cool</div>
            * </div>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */`);
  }
  if (finalParams.scope.includes("bare")) {
    vars.comment(() => `/**
            * @name           s-tooltip
            * @namespace      sugar.css.ui.tooltip
            * @type           CssClass
            * 
            * This class represent a simple tooltip
            * 
            * @example        html
            * <a class="s-tooltip-container s-btn">
            *   I'm a cool button
            *   <div class="s-tooltip">Something cool</div>
            * </a>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */`);
    vars.code(() => `
            .s-tooltip {
                @sugar.ui.tooltip($scope: bare);
            }
        `);
  }
  if (finalParams.scope.includes("lnf")) {
    finalParams.styles.forEach((style) => {
      vars.comment(() => `/**
                * @name           s-tooltip${finalParams.defaultStyle === style ? "" : `:${style}`}
                * @namespace      sugar.css.ui.tooltip
                * @type           CssClass
                * 
                * This class represent a ${style} tooltip
                * 
                * @example        html
                * <a class="s-tooltip-container s-btn">
                *   I'm a cool button
                *   <div class="s-tooltip${finalParams.defaultStyle === style ? "" : `:${style}`}">Something cool</div>
                * </a>
                * 
                * @since    2.0.0
                * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */`);
      vars.code(() => `
                .s-tooltip${finalParams.defaultStyle === style ? "" : `--${style}`} {
                    @sugar.ui.tooltip($style: ${style}, $scope: lnf);
                }
            `);
    });
  }
  if (finalParams.scope.includes("shape")) {
    finalParams.shapes.forEach((shape) => {
      vars.comment(() => `/**
                * @name           s-tooltip${finalParams.defaultShape === shape ? "" : `:${shape}`}
                * @namespace      sugar.css.ui.tooltip
                * @type           CssClass
                * 
                * This class represent a ${shape} tooltip
                * 
                * @example        html
                * <a class="s-tooltip-container s-btn">
                *   I'm a cool button
                *   <div class="s-tooltip${finalParams.defaultShape === shape ? "" : `:${shape}`}">Something cool</div>
                * </a>
                * 
                * @since    2.0.0
                * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */`);
      vars.code(() => `
                .s-tooltip${finalParams.defaultShape === shape ? "" : `--${shape}`} {
                    @sugar.ui.tooltip($shape: ${shape}, $scope: shape);
                }
            `);
    });
  }
  vars.comment(() => `/**
        * @name           s-tooltip--interactive
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class make a tooltip interactive. This mean that the user can hover the tooltip,
        * select texts in it, click on buttons, etc...
        * 
        * @example        html
        * <a class="s-tooltip-container s-btn">
        *   I'm a cool button
        *   <div class="s-tooltip:interactive">Something cool</div>
        * </a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`);
  vars.code(() => `
        .s-tooltip--interactive {
            @sugar.ui.tooltip($interactive: true, $scope: 'interactive');
        }
    `);
  vars.comment(() => `/**
        * @name           s-tooltip
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a simple block start (top) tooltip
        * 
        * @example        html
        * <a class="s-tooltip-container s-btn">
        *   I'm a cool button
        *   <div class="s-tooltip">Something cool</div>
        * </a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`);
  vars.code(() => `
        .s-tooltip {
            @sugar.ui.tooltip($position: top, $scope: position);
        }
    `);
  vars.comment(() => `/**
        * @name           s-tooltip:right
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a simple inline end (right) tooltip
        * 
        * @example        html
        * <a class="s-tooltip-container s-btn">
        *   I'm a cool button
        *   <div class="s-tooltip:right">Something cool</div>
        * </a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`);
  vars.code(() => `
        .s-tooltip--right {
            @sugar.ui.tooltip($position: right, $scope: position);
        }
    `);
  vars.comment(() => `/**
        * @name           s-tooltip:left
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a simple left tooltip
        * 
        * @example        html
        * <a class="s-tooltip-container s-btn">
        *   I'm a cool button
        *   <div class="s-tooltip:left">Something cool</div>
        * </a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`);
  vars.code(() => `
        .s-tooltip--left {
            @sugar.ui.tooltip($position: left, $scope: position);
        }
    `);
  vars.comment(() => `/**
        * @name           s-tooltip:bottom
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a simple block end (bottom) tooltip
        * 
        * @example        html
        * <a class="s-tooltip-container s-btn">
        *   I'm a cool button
        *   <div class="s-tooltip:bottom">Something cool</div>
        * </a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`);
  vars.code(() => `
        .s-tooltip--bottom {
            @sugar.ui.tooltip($position: bottom, $scope: position);
        }
    `);
  return vars;
}
export {
  classes_default as default,
  dependencies,
  postcssSugarPluginUiTooltipClassesInterface as interface
};
