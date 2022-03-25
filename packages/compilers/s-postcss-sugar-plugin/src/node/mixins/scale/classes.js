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
class postcssSugarPluginScaleClassesInterface extends __SInterface {
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
  const scaleObj = __STheme.config("scale");
  const vars = new CssVars();
  vars.comment(() => `
      /**
        * @name          Scale
        * @namespace          sugar.css.tools
        * @type               Styleguide
        * @menu           Styleguide / Tools        /styleguide/tools/scale
        * @platform       css
        * @status       beta
        * 
        * These classes allows to apply a scale to any supported UI elements.
        * This scale does not use the transform property but increase actual values like \`padding\`,
        * \`margin\`, etc... In fact, all the properties setted with the \`sugar.scallable\` function.
        * It's usually a good practice to set the \`font-size\` of your UI element to \`sugar.scalable(1rem)\`
        * and then to set inner values using \`em\` unit.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        ${Object.keys(scaleObj).map((scaleName) => {
    return ` * @cssClass     s-scale:${scaleName.replace("/", "-")}
                }            Apply the ${scaleName} scale`;
  }).join("\n")}
        * 
        * @example        html
        ${Object.keys(scaleObj).map((scaleName) => {
    return ` * <!-- ${scaleName} scale -->
            * <div class="s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Scale ${scaleName}</h3>
            *   <div class="s-scale:${scaleName}">
            *       <a class="s-btn">${__faker.name.findName()}</a>
            *   </div>
            * </div>
            * `;
  }).join("\n")}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
  Object.keys(scaleObj).forEach((scaleName) => {
    const scaleValue = scaleObj[scaleName];
    vars.comment(() => `/**
  * @name          s-scale:${scaleName}
  * @namespace          sugar.css.scale
  * @type               CssClass
  * @platform             css
  * @status             beta
  * 
  * This class allows you to apply a "<yellow>${scaleName}</yellow>" scale style to any HTMLElement.
  * Note that this scale is not applied using the "transform" property but it will scale
  * all the properties that uses the function "sugar.scalable" to set his value.
  * 
  * @example        html
  * <h1 class="s-font:40 s-mbe:30">I'm a cool title</h1>
  * <h1 class="s-font:40 s-scale:15">I'm a cool scaled title</h1>
  * 
  * since           2.0.0
  * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
  */
 `).code(`
.s-scale--${scaleName} {
    --s-scale: ${scaleValue};
}`);
  });
  return vars;
}
export {
  classes_default as default,
  postcssSugarPluginScaleClassesInterface as interface
};
