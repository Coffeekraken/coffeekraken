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
import __STheme from "@coffeekraken/s-theme";
import __faker from "faker";
class postcssSugarPluginFontClassesInterface extends __SInterface {
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
  const fontsFamiliesObj = __STheme.config("font.family"), fontSizesObj = __STheme.config("font.size"), fontStretchProps = [
    "ultra-condensed",
    "extra-condensed",
    "condensed",
    "semi-condensed",
    "semi-expanded",
    "expanded",
    "extra-expanded",
    "ultra-expanded"
  ], fontWeightProps = [
    "bold",
    "bolder",
    "lighter",
    "weight-100",
    "weight-200",
    "weight-300",
    "weight-400",
    "weight-500",
    "weight-600",
    "weight-700",
    "weight-800",
    "weight-900"
  ];
  vars.comment(() => `
      /**
        * @name          Families
        * @namespace          sugar.css.font
        * @type               CssClass
        * @menu           Styleguide / Fonts        /styleguide/fonts/families
        * @platform       css
        * @status       beta
        * 
        * This class allows you to apply a font to any HTMLElement
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        ${Object.keys(fontsFamiliesObj).map((fontName) => {
    return `* @cssClass      s-font:${fontName}       Apply the \`${fontName}\` font on any HTMLElement`;
  }).join("\n ")}
        *    
        * @example        html
        ${Object.keys(fontsFamiliesObj).map((family) => {
    return ` * <div class="s-mbe:50">
                        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${family}</h3>
                        *   <p class="s-font:${family} s-font:60">${__faker.lorem.sentence()}</p>
                        * </div>`;
  }).join("\n")}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  vars.comment(() => `
      /**
        * @name          Sizes
        * @namespace          sugar.css.font
        * @type               CssClass
        * @menu           Styleguide / Fonts        /styleguide/fonts/sizes
        * @platform       css
        * @status       beta
        * 
        * This class allows you to apply a font size to any HTMLElement
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        ${Object.keys(fontSizesObj).map((sizeName) => {
    return ` * @cssClass            s-font:${sizeName}          Apply the \`${sizeName}\` size`;
  }).join("\n")}
        * 
        *    
        * @example        html
        ${Object.keys(fontSizesObj).map((size) => {
    return ` * <div class="s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${size}</h3>
            *   <p class="s-font:${size}">${__faker.lorem.sentence()}</p>
            * </div>`;
  }).join("\n")}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  vars.comment(() => `
      /**
        * @name          Styles
        * @namespace          sugar.css.font
        * @type               CssClass
        * @menu           Styleguide / Fonts        /styleguide/fonts/styles
        * @platform       css
        * @status       beta
        * 
        * This class allows you to apply a font style to any HTMLElement
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass         s-font:italic                   Apply the \`italic\` font-style value
        * @cssClass         s-font:oblique                   Apply the \`oblique\` font-style value
        *    
        * @example        html
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Italic</h3>
        *   <p class="s-font:italic s-mbe:20">${__faker.lorem.sentence()}</p>
        * </div>
        * 
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Oblique</h3>
        *   <p class="s-font:oblique s-mbe:20">${__faker.lorem.sentence()}</p>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  vars.comment(() => `
      /**
        * @name          Weights
        * @namespace          sugar.css.font
        * @type               CssClass
        * @menu           Styleguide / Fonts        /styleguide/fonts/weights
        * @platform       css
        * @status       beta
        * 
        * This class allows you to apply a font weight to any HTMLElement
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass         s-font:bold                     Apply the \`bold\` font-weight value
        * @cssClass         s-font:bolder                     Apply the \`bolder\` font-weight value
        * @cssClass         s-font:lighter                     Apply the \`lighter\` font-weight value
        * @cssClass         s-font:weight-100                     Apply the \`100\` font-weight value
        * @cssClass         s-font:weight-200                     Apply the \`200\` font-weight value
        * @cssClass         s-font:weight-300                     Apply the \`300\` font-weight value
        * @cssClass         s-font:weight-400                     Apply the \`400\` font-weight value
        * @cssClass         s-font:weight-500                     Apply the \`500\` font-weight value
        * @cssClass         s-font:weight-600                     Apply the \`600\` font-weight value
        * @cssClass         s-font:weight-700                     Apply the \`700\` font-weight value
        * @cssClass         s-font:weight-800                     Apply the \`800\` font-weight value
        * @cssClass         s-font:weight-900                     Apply the \`900\` font-weight value
        * 
        *    
        * @example        html
        ${fontWeightProps.map((weight) => {
    return ` * <div class="s-mbe:50">
                    *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${weight}</h3>
                    *   <p class="s-font:${weight}:50">${__faker.lorem.sentence()}</p>
                    * </div>`;
  }).join("\n")}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  vars.comment(() => `
      /**
        * @name          Stretches
        * @namespace          sugar.css.font
        * @type               CssClass
        * @menu           Styleguide / Fonts        /styleguide/fonts/stretches
        * @platform       css
        * @status       beta
        * 
        * This class allows you to apply a font stretch to any HTMLElement
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass         s-font:ultra-condensed              Apply the \`ultra-condensed\` font-stretch value
        * @cssClass         s-font:extra-condensed              Apply the \`extra-condensed\` font-stretch value
        * @cssClass         s-font:condensed              Apply the \`condensed\` font-stretch value
        * @cssClass         s-font:semi-condensed              Apply the \`semi-condensed\` font-stretch value
        * @cssClass         s-font:semi-expanded              Apply the \`semi-expanded\` font-stretch value
        * @cssClass         s-font:expanded              Apply the \`expanded\` font-stretch value
        * @cssClass         s-font:extra-expanded              Apply the \`extra-expanded\` font-stretch value
        * @cssClass         s-font:ultra-expanded              Apply the \`ultra-expanded\` font-stretch value
        *    
        * @example        html
        ${fontStretchProps.map((stretch) => {
    return ` * <div class="s-mbe:50">
                    *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${stretch}</h3>
                    *   <p class="s-font:${stretch}:50">${__faker.lorem.sentence()}</p>
                    * </div> `;
  }).join("\n")}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  vars.comment(() => `
      /**
        * @name          Resets
        * @namespace          sugar.css.font
        * @type               CssClass
        * @menu           Styleguide / Fonts        /styleguide/fonts/resets
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to **reset fonts** like \`size\`, \`family\`, etc...
        * 
        * @cssClass           s-font:reset-size          Reset the size to 1rem
        * @cssClass           s-font:reset-family        Reset to the default font
        * 
        * @example        html
        * <h3 class="s-tc:accent s-font:30 s-mb:20">Reset size</h3>
        * <div class="s-font:60 s-mbe:30">
        *   ${__faker.name.title()} <span class="s-font:reset-size">${__faker.name.findName()}</span>
        * </div>
        * 
        * <h3 class="s-tc:accent s-font:30 s-mb:20">Reset family</h3>
        * <div class="s-font:quote s-font:50">
        *   ${__faker.name.title()} <span class="s-font:reset-family">${__faker.name.findName()}</span>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  Object.keys(fontsFamiliesObj).forEach((fontName) => {
    vars.comment(() => `
        /**
        * @name          s-font:${fontName}
        * @namespace          sugar.css.font
        * @type               CssClass
        * @platform       css
        * @status       beta
        * 
        * This class allows you to apply the font "<yellow>${fontName}</yellow>" to any HTMLElement
        * 
        * @example        html
        * <h1 class="s-font:${fontName}">Hello world</h1>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
.s-font--${fontName} {
    @sugar.font.family(${fontName});
}`);
  });
  Object.keys(fontSizesObj).forEach((sizeName) => {
    if (sizeName === "default")
      return;
    vars.comment(() => `/**
  * @name          s-font:${sizeName}
  * @namespace          sugar.css.mixins.font
  * @type               CssClass
  * @platform         css
  * @status           beta
  * 
  * This class allows you to apply the font size "<yellow>${sizeName}</yellow>" to any HTMLElement
  * 
  * @example        html
  * <h1 class="s-font:${sizeName}">Hello world</h1>
  */
 `).code(`
.s-font--${sizeName} {
    @sugar.font.size(${sizeName});
}`);
  });
  vars.comment(() => `/**
  * @name          s-font:reset-size
  * @namespace          sugar.css.mixins.font
  * @type               CssClass
  * @platform         css
  * @status           beta
  * 
  * This class allows you to reset the font size to 1rem on any HTMLElement
  * 
  * @example        html
  * <h1 class="s-font:reset-size">Hello world</h1>
  * 
  * @since      2.0.0
  * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
  */
 `).code(`
.s-font--reset-size {
  font-size: sugar.scalable(1rem);
}`);
  vars.comment(() => `/**
  * @name          s-font:reset-family
  * @namespace          sugar.css.mixins.font
  * @type               CssClass
  * @platform         css
  * @status           beta
  * 
  * This class allows you to reset the font family to default on any HTMLElement
  * 
  * @example        html
  * <h1 class="s-font:reset-family">Hello world</h1>
  * 
  * @since      2.0.0
  * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
  */
 `).code(`
.s-font--reset-family {
  @sugar.font.family(default);
}`);
  fontStretchProps.forEach((value) => {
    vars.comment(() => `/**
            * @name          s-font:${value}
            * @namespace          sugar.css.mixins.font
            * @type               CssClass
            * @platform         css
            * @status           beta
            * 
            * This class allows you to apply the \`font-stretch: ${value}\` value to any HTMLElement
            * 
            * @example        html
            * <h1 class="s-font:${value}">Hello world</h1>
            * 
            * @since      2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
           `).code(`
            .s-font--${value} {
                font-stretch: ${value};
            }`);
  });
  vars.comment(() => `/**
            * @name          s-font:italic
            * @namespace          sugar.css.mixins.font
            * @type               CssClass
            * @platform         css
            * @status           beta
            * 
            * This class allows you to apply the \`font-style: italic\` css value on any HTMLElement
            * 
            * @example        html
            * <h1 class="s-font:italic">Hello world</h1>
            * 
            * @since      2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
           `).code(`
            .s-font--italic {
                font-style: italic;
            }`);
  vars.comment(() => `/**
            * @name          s-font:oblique
            * @namespace          sugar.css.mixins.font
            * @type               CssClass
            * @platform         css
            * @status           beta
            * 
            * This class allows you to apply the \`font-style: oblique\` css value on any HTMLElement
            * 
            * @example        html
            * <h1 class="s-font:oblique">Hello world</h1>
            * 
            * @since      2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
           `).code(`
            .s-font--oblique {
                font-style: oblique;
            }`);
  fontWeightProps.forEach((value) => {
    vars.comment(() => `/**
            * @name          s-font:${value}
            * @namespace          sugar.css.mixins.font
            * @type               CssClass
            * @platform         css
            * @status           beta
            * 
            * This class allows you to apply the \`font-weight: ${value.replace("weight-", "")}\` value to any HTMLElement
            * 
            * @example        html
            * <h1 class="s-font:${value.replace("weight-", "")}">Hello world</h1>
            * 
            * @since      2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            .s-font--${value} {
                font-weight: ${value.replace("weight-", "")};
            }`);
  });
  return vars;
}
export {
  classes_default as default,
  postcssSugarPluginFontClassesInterface as interface
};
