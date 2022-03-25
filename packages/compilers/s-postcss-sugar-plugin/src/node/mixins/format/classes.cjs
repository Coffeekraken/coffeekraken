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
  interface: () => postcssSugarPluginFormatClassesInterface
});
module.exports = __toCommonJS(classes_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
var import_s_theme = __toESM(require("@coffeekraken/s-theme"), 1);
var import_faker = __toESM(require("faker"), 1);
class postcssSugarPluginFormatClassesInterface extends import_s_interface.default {
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
  const typoFormatElements = Object.keys(import_s_theme.default.config("typo")).map((typo) => {
    return `${typo}`;
  });
  const uiFormatElements = Object.keys(import_s_theme.default.config("ui")).filter((ui) => {
    const uiObj = import_s_theme.default.config("ui")[ui];
    return uiObj.formatText === true;
  }).map((ui) => {
    return `${ui}`;
  });
  vars.comment(() => `
      /**
        * @name          Format text
        * @namespace          sugar.css.font
        * @type               CssClass
        * @menu           Styleguide / Tools        /styleguide/tools/format-text
        * @platform       css
        * @status       beta
        * 
        * This class allows you to apply some formatting to pure HTMLElement that are scoped into.
        * For example, a simple \`ul\` tag will be styled as if the \`s-list:ul\` class would be applied on it
        * when it is scoped inside the \`s-format:text\` class.
        * This feature has to be implemented using the \`@sugar.format.text\` mixin on the elements you
        * want to support the text formatting.
        * 
        ${typoFormatElements.map((typo) => {
    return ` * @feature         \`${typo}\` typo supported`;
  })}
        ${uiFormatElements.map((typo) => {
    return ` * @feature         \`${typo}\` UI supported`;
  })}
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass               s-format:text             Apply the text formatting to childs elements like \`ul\`, \`ol\`, \`p\`, \`h1\`, \`h2\`, etc... HTML tags
        * 
        * @example        html
        * <!-- block -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Text format</h3>
        *   <div class="s-format:text s-rhythm:vertical">
        *       <h1>${import_faker.default.name.findName()}</h1>
        *       <p>${import_faker.default.lorem.sentence()}</p>
        *       <ul>
        *           <li>${import_faker.default.name.findName()}</li>
        *           <li>${import_faker.default.name.findName()}</li>
        *           <li>${import_faker.default.name.findName()}</li>
        *       </ul>
        *       <blockquote>
        *           ${import_faker.default.lorem.paragraph()}
        *       </blockquote>
        *       <table>
        *           <tr>
        *               <th>Hello</th>
        *               <th>World</th>
        *           </tr>
        *           <tr>
        *               <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *               <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *           </tr>
        *           <tr>
        *               <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *               <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *           </tr>
        *       </table>
        *       <ol>
        *           <li>${import_faker.default.name.findName()}</li>
        *           <li>${import_faker.default.name.findName()}</li>
        *           <li>${import_faker.default.name.findName()}</li>
        *       </ol>
        *       <select>
        *           <option>${import_faker.default.name.findName()}</option>
        *           <option>${import_faker.default.name.findName()}</option>
        *           <option>${import_faker.default.name.findName()}</option>
        *       </select>
        *       <br />
        *       <button>${import_faker.default.name.findName()}</button>
        *   </div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  const typoRhythmElements = Object.keys(import_s_theme.default.config("typo")).filter((typo) => {
    const typoObj = import_s_theme.default.config("typo")[typo];
    return typoObj.rhythmVertical !== void 0;
  }).map((typo) => {
    return `${typo}`;
  });
  const uiRhythmElements = Object.keys(import_s_theme.default.config("ui")).filter((ui) => {
    const uiObj = import_s_theme.default.config("ui")[ui];
    return uiObj.rhythmVertical !== void 0;
  }).map((ui) => {
    return `${ui}`;
  });
  vars.comment(() => `
      /**
        * @name          Rhythm vertical
        * @namespace          sugar.css.font
        * @type               CssClass
        * @menu           Styleguide / Tools        /styleguide/tools/rhythm-vertical
        * @platform       css
        * @status       beta
        * 
        * This class allows you to apply some margins to make space between direct childs.
        * This feature has to be implemented using the \`@sugar.rhythm.vertical\` mixin on the elements you
        * want to support the rhythm vertical.
        * 
        ${typoRhythmElements.map((typo) => {
    return ` * @feature         \`${typo}\` typo supported`;
  })}
        ${uiRhythmElements.map((typo) => {
    return ` * @feature         \`${typo}\` UI supported`;
  })}
        * 
        * @cssClass               s-rhythm:vertical             Apply the rhythm vertical to direct childs elements like \`ul\`, \`ol\`, \`p\`, \`h1\`, \`h2\`, etc... HTML tags
        * 
        * @example        html
        * <!-- block -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Rhythm vertical</h3>
        *   <div class="s-format:text s-rhythm:vertical">
        *       <h1>${import_faker.default.name.findName()}</h1>
        *       <p>${import_faker.default.lorem.sentence()}</p>
        *       <ul>
        *           <li>${import_faker.default.name.findName()}</li>
        *           <li>${import_faker.default.name.findName()}</li>
        *           <li>${import_faker.default.name.findName()}</li>
        *       </ul>
        *       <blockquote>
        *           ${import_faker.default.lorem.paragraph()}
        *       </blockquote>
        *       <table>
        *           <tr>
        *               <th>Hello</th>
        *               <th>World</th>
        *           </tr>
        *           <tr>
        *               <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *               <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *           </tr>
        *           <tr>
        *               <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *               <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit</td>
        *           </tr>
        *       </table>
        *       <ol>
        *           <li>${import_faker.default.name.findName()}</li>
        *           <li>${import_faker.default.name.findName()}</li>
        *           <li>${import_faker.default.name.findName()}</li>
        *       </ol>
        *       <select>
        *           <option>${import_faker.default.name.findName()}</option>
        *           <option>${import_faker.default.name.findName()}</option>
        *           <option>${import_faker.default.name.findName()}</option>
        *       </select>
        *       <br />
        *       <button>${import_faker.default.name.findName()}</button>
        *   </div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  return vars;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
