import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
import __keysFirst from "@coffeekraken/sugar/shared/array/keysFirst";
class postcssSugarPluginBorderRadiusClassesMixinInterface extends __SInterface {
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
  const radiusesObj = __STheme.config("border.radius");
  const radiusesKeys = __keysFirst(Object.keys(radiusesObj), ["default"]);
  const widthsObj = __STheme.config("border.width");
  const widthsKeys = __keysFirst(Object.keys(widthsObj), ["default"]);
  const vars = new CssVars();
  vars.comment(() => `
      /**
        * @name          Radius
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/radius
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply border radius on any HTMLElement
        * 
        * @support      chromium        
        * @support      firefox         
        * @support      safari          
        * @support      edge           
        * 
        ${radiusesKeys.map((radiusName) => {
    if (radiusName === "default")
      return "";
    return ` * @cssClass      s-radius:${radiusName}      Apply the border radius ${radiusName} to any HTMLElement`;
  }).join("\n")}
        *
        * @example        html          Border radius
        ${radiusesKeys.map((radiusName) => {
    if (radiusName === "default")
      return "";
    return `
              *   <div class="s-radius:${radiusName} s-display:inline-block s-width:20 s-bg:main s-pbs:30 s-mie:30 s-mbe:30 s-text:center s-ratio:1">
              *     ${radiusName}
              *   </div> 
            `;
  }).join("\n")}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  vars.comment(() => `
      /**
        * @name          Border width
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/border-width
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some border width to any HTMLElement
        * 
        * @support      chromium        
        * @support      firefox         
        * @support      safari          
        * @support      edge           
        * 
        ${widthsKeys.map((widthName) => {
    if (widthName === "default")
      return "";
    return ` * @cssClass      s-bwidth:${widthName}      Apply the border width ${widthName} to any HTMLElement`;
  }).join("\n")}
        *
        * @example             html         Border width
        ${widthsKeys.map((widthName) => {
    if (widthName === "default")
      return "";
    return `   <div class="s-display:inline-block s-width:20 s-pbs:20 s-mie:20 s-mbe:20 s-text:center s-ratio:1 s-bcolor:accent s-bwidth:${widthName}">
              *     ${widthName}
              *   </div> 
            `;
  }).join("\n")}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  vars.comment(() => `
      /**
        * @name          Border color
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/border-color
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some border color to any HTMLElement
        * 
        * @support      chromium        
        * @support      firefox         
        * @support      safari          
        * @support      edge           
        * 
        ${Object.keys(__STheme.getTheme().baseColors()).map((colorName) => {
    if (colorName === "default")
      return "";
    return ` * @cssClass      s-bcolor:${colorName}      Apply the border color ${colorName} to any HTMLElement`;
  }).join("\n")}
        *
        * @example             html         Border color
        ${Object.keys(__STheme.getTheme().baseColors()).map((colorName) => {
    return ` * <div class="s-display:inline-block s-width:20 s-pbs:20 s-mie:20 s-mbe:20 s-text:center s-ratio:1 s-bcolor:${colorName} s-bwidth:20">
              *     ${colorName}
              *   </div> 
            `;
  }).join("\n")}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  radiusesKeys.forEach((radiusName) => {
    const cls = `s-radius--${radiusName}`.replace("--default", "");
    const clsName = `s-radius:${radiusName}`.replace(":default", "");
    const radiusCss = `/**
            * @name               ${clsName}
            * @namespace          sugar.css.border
            * @type               CssClass
            * @platform         css
            * @status           beta
            * 
            * This class allows you to apply a "<yellow>${radiusName}</yellow>" border radius style to any HTMLElement
            * 
            * @example        html
            * <div class="${clsName.replace(":", ":")} s-color--complementary">
            *     Hello world
            * </div>
            */
 `;
    vars.comment(() => radiusCss).code(`
            .${cls} {
                @sugar.border.radius(${radiusName});
            }
        `);
  });
  widthsKeys.forEach((widthName) => {
    const cls = `s-bwidth:${widthName}`.replace(":default", "");
    const clsName = `s-bwidth--${widthName}`.replace("--default", "");
    vars.comment(() => `/**
                * @name               ${cls}
                * @namespace          sugar.css.border
                * @type               CssClass
                * @platform         css
                * @status           beta
                * 
                * This class allows you to apply a "<yellow>${widthName}</yellow>" border width style to any HTMLElement
                * 
                * @example        html
                * <div class="${cls}">
                *     Hello world
                * </div>
                */
        `).code(`
        .${clsName} {
            @sugar.border.width(${widthName});
        }`);
  });
  Object.keys(__STheme.getTheme().baseColors()).forEach((colorName) => {
    const cls = `s-bcolor:${colorName}`.replace(":default", "");
    const clsName = `s-bcolor--${colorName}`.replace("--default", "");
    vars.comment(() => `/**
                * @name               ${cls}
                * @namespace          sugar.css.border
                * @type               CssClass
                * @platform         css
                * @status           beta
                * 
                * This class allows you to apply a "<yellow>${colorName}</yellow>" border color style to any HTMLElement
                * 
                * @example        html
                * <div class="${cls}">
                *     Hello world
                * </div>
                */
        `).code(`
        .${clsName} {
            border-color: sugar.color(${colorName});
        }`);
  });
  return vars;
}
export {
  classes_default as default,
  postcssSugarPluginBorderRadiusClassesMixinInterface as interface
};
