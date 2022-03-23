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
  dependencies: () => dependencies,
  interface: () => postcssSugarPluginUiFsTreeClassesInterface
});
module.exports = __toCommonJS(classes_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
var import_s_theme = __toESM(require("@coffeekraken/s-theme"));
var import_faker = __toESM(require("faker"));
var import_dirname = __toESM(require("@coffeekraken/sugar/node/fs/dirname"));
class postcssSugarPluginUiFsTreeClassesInterface extends import_s_interface.default {
  static get _definition() {
    var _a;
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
        default: (_a = import_s_theme.default.config("ui.fsTree.defaultStyle")) != null ? _a : "solid"
      },
      scope: {
        type: {
          type: "Array<String>",
          splitChars: [",", " "]
        },
        values: ["bare", "lnf", "shape", "tf", "vr"],
        default: ["bare", "lnf", "shape", "tf", "vr"]
      }
    };
  }
}
function dependencies() {
  return {
    files: [`${(0, import_dirname.default)()}/fsTree.js`]
  };
}
function classes_default({
  params,
  atRule,
  applyNoScopes,
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
  finalParams.scope = applyNoScopes(finalParams.scope);
  const vars = new CssVars();
  function _example(classes, isDefault = false) {
    return `*   <ul class="s-fs-tree${isDefault ? "" : `:${classes}`}">
            *       <li class="active">
            *           <div>
            *               <i class="s-icon:folder-open"></i>
            *               <span tabindex="0">${import_faker.default.name.findName()}</span>
            *           </div>
            *           <ul>
            *               <li>
            *                   <div>
            *                       <i class="s-icon:file"></i>
            *                       <a tabindex="0">${import_faker.default.name.findName()}</a>
            *                   </div>
            *               </li>
            *               <li class="active">
            *                   <div>
            *                       <i class="s-icon:folder-open"></i>
            *                       <span tabindex="0">${import_faker.default.name.findName()}</span>
            *                   </div>
                                <ul>
                    *               <li>
                    *                   <div>
                    *                       <i class="s-icon:file-pdf"></i>
                    *                       <a tabindex="0">${import_faker.default.name.findName()}</a>
                    *                   </div>
                    *               </li>
                    *               <li>
                    *                  <div>
                    *                       <i class="s-icon:file-code"></i>
                    *                       <a tabindex="0">${import_faker.default.name.findName()}</a>
                    *                  </div>
                    *               </li>
                    *              <li>
                    *                   <div>
                    *                       <i class="s-icon:file-image"></i>
                    *                       <a tabindex="0">${import_faker.default.name.findName()}</a>
                    *                   </div>
                    *               </li>
                    *           </ul>
            *               </li>
            *              <li>
            *                   <div>
            *                       <i class="s-icon:file-archive"></i>
            *                       <a tabindex="0">${import_faker.default.name.findName()}</a>
            *                   </div>
            *               </li>
            *           </ul>
            *           <li class="s-disabled">
            *               <div>
        *                       <i class="s-icon:file"></i>
        *                       <a tabindex="0">${import_faker.default.name.findName()}</a>
        *                  </div>
        *               </li>
            *           <li>
            *               <div>
        *                       <i class="s-icon:file-code"></i>
        *                       <a tabindex="0">${import_faker.default.name.findName()}</a>
        *                 </div>
        *               </li>
            *       </li>
            *   </ul>
            *`;
  }
  vars.comment(() => `
      /**
        * @name          Fs Tree
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/fs-tree
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to display a nice filesystem tree
        * 
        * @feature          Support for scaling through the \`s-scale:...\` class
        * @feature          Support for colorizing through the \`s-color:...\` class
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        ${finalParams.styles.map((style) => {
    return ` * @cssClass     s-fs-tree${style === finalParams.defaultStyle ? "" : `:${style}`}           Apply the ${style} filesystem tree style`;
  }).join("\n")}
        ${finalParams.shapes.map((shape) => {
    return ` * @cssClass     s-fs-tree${shape === finalParams.defaultShape ? "" : `:${shape}`}           Apply the ${shape} filesystem tree shape`;
  }).join("\n")}
        * 
        ${finalParams.styles.map((style) => {
    return ` * @example        html       ${style} style ${finalParams.defaultStyle === style ? '<span class="s-badge:outline s-scale:05">default</span>' : ""}
                    ${_example(style, params.defaultStyle === style)}`;
  }).join("\n")}
        *
        ${finalParams.shapes.map((shape) => {
    return ` * @example        html       ${shape} shape ${finalParams.defaultShape === shape ? '<span class="s-badge:outline s-scale:05">default</span>' : ""}
                ${_example(shape, params.defaultShape === shape)}`;
  }).join("\n")}
        *
        * @example        html       RTL
        * <div dir="rtl">
        ${_example("")}
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  if (finalParams.scope.includes("bare")) {
    vars.comment(() => `/**
            * @name           s-fs-tree
            * @namespace      sugar.css.ui.list
            * @type           CssClass
            * 
            * This class represent an "<yellow>${import_s_theme.default.config("ui.fsTree.defaultStyle")}</yellow>" filesystem tree
            * 
            * @feature       Support RTL
            * 
            * @example        html
            * <ul class="s-fs-tree">
            *       <li>
            *          <i class="s-icon:folder"></i> ${import_faker.default.name.findName()}
            *          <ul>
            *               <li><i class="s-icon:file"></i> ${import_faker.default.name.findName()}</li>
            *               <li><i class="s-icon:file"></i> ${import_faker.default.name.findName()}</li>
            *              <li><i class="s-icon:file"></i> ${import_faker.default.name.findName()}</li>
            *           </ul>
            *           <li><i class="s-icon:file"></i> ${import_faker.default.name.findName()}</li>
            *           <li><i class="s-icon:file"></i> ${import_faker.default.name.findName()}</li>
            *       </li>
            *   </ul>
            * 
            * @since       2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
        .s-fs-tree {
            @sugar.ui.fsTree($scope: bare);
        }
    `);
  }
  if (finalParams.scope.includes("lnf")) {
    finalParams.styles.forEach((style) => {
      vars.comment(() => `/**
                * @name           s-fs-tree${style === finalParams.defaultStyle ? "" : `:${style}`}
                * @namespace      sugar.css.ui.list
                * @type           CssClass
                * 
                * This class represent an "<yellow>${style}</yellow>" filesystem tree
                * 
                * @example        html
                * <ul class="s-fs-tree${style === finalParams.defaultStyle ? "" : `:${style}`}">
                *       <li>
                *          <i class="s-icon:folder"></i> ${import_faker.default.name.findName()}
                *          <ul>
                *               <li><i class="s-icon:file"></i> ${import_faker.default.name.findName()}</li>
                *               <li><i class="s-icon:file"></i> ${import_faker.default.name.findName()}</li>
                *              <li><i class="s-icon:file"></i> ${import_faker.default.name.findName()}</li>
                *           </ul>
                *           <li><i class="s-icon:file"></i> ${import_faker.default.name.findName()}</li>
                *           <li><i class="s-icon:file"></i> ${import_faker.default.name.findName()}</li>
                *       </li>
                *   </ul>
                * 
                * @since       2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
           `).code(`
            .s-fs-tree${style === finalParams.defaultStyle ? "" : `--${style}`} {
                @sugar.ui.fsTree($style: ${style}, $scope: lnf);
            }
        `);
    });
  }
  if (finalParams.scope.includes("shape")) {
    finalParams.shapes.forEach((shape) => {
      vars.comment(() => `/**
                * @name           s-fs-tree${shape === finalParams.defaultShape ? "" : `:${shape}`}
                * @namespace      sugar.css.ui.list
                * @type           CssClass
                * 
                * This class represent an "<yellow>${shape}</yellow>" filesystem tree
                * 
                * @example        html
                * <ul class="s-fs-tree${shape === finalParams.defaultShape ? "" : `:${shape}`}">
                *       <li>
                *          <i class="s-icon:folder"></i> ${import_faker.default.name.findName()}
                *          <ul>
                *               <li><i class="s-icon:file"></i> ${import_faker.default.name.findName()}</li>
                *               <li><i class="s-icon:file"></i> ${import_faker.default.name.findName()}</li>
                *              <li><i class="s-icon:file"></i> ${import_faker.default.name.findName()}</li>
                *           </ul>
                *           <li><i class="s-icon:file"></i> ${import_faker.default.name.findName()}</li>
                *           <li><i class="s-icon:file"></i> ${import_faker.default.name.findName()}</li>
                *       </li>
                *   </ul>
                * 
                * @since       2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
           `).code(`
            .s-fs-tree${shape === finalParams.defaultShape ? "" : `--${shape}`} {
                @sugar.ui.fsTree($shape: ${shape}, $scope: shape);
            }
        `);
    });
  }
  if (finalParams.scope.indexOf("vr") !== -1) {
    vars.comment(() => `/**
            * @name           s-rhythm:vertical
            * @namespace      sugar.css.ui.list
            * @type           CssClass
            * 
            * This class represent some lists in the s-rhythm:vertical scope
            * 
            * @feature      Vertical rhythm
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <ul class="s-fs-tree">
            *       <li>
            *          <i class="s-icon:folder"></i> ${import_faker.default.name.findName()}
            *          <ul>
            *               <li><i class="s-icon:file"></i> ${import_faker.default.name.findName()}</li>
            *               <li><i class="s-icon:file"></i> ${import_faker.default.name.findName()}</li>
            *              <li><i class="s-icon:file"></i> ${import_faker.default.name.findName()}</li>
            *           </ul>
            *           <li><i class="s-icon:file"></i> ${import_faker.default.name.findName()}</li>
            *           <li><i class="s-icon:file"></i> ${import_faker.default.name.findName()}</li>
            *       </li>
            *   </ul>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
            @sugar.rhythm.vertical {
                .s-fs-tree {
                    ${import_s_theme.default.jsObjectToCssProperties(import_s_theme.default.config("ui.fsTree.rhythmVertical"))}
                } 
            }
        `);
  }
  return vars;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  dependencies,
  interface
});
