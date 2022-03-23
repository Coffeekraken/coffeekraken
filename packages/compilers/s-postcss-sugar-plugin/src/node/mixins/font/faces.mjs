import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginFontFacesInterface extends __SInterface {
  static get _definition() {
    return {};
  }
}
function faces_default({
  params,
  atRule,
  CssVars,
  replaceWith
}) {
  const finalParams = __spreadValues({}, params);
  const vars = new CssVars();
  const fontsFamiliesObj = __STheme.config("font.family");
  Object.keys(fontsFamiliesObj).forEach((fontName) => {
    const fontObj = fontsFamiliesObj[fontName];
    if (fontObj.import) {
      vars.comment(() => `/**
        * @name               ${fontName}
        * @namespace          sugar.css.font
        * @type               CssFontFace
        * @platform           css
        * @status             beta
        * 
        * This declare the @font-face for the "<yellow>${fontName}</yellow> font family"
        * 
        * @since          2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
        @import url("${fontObj.import}");
      `);
    }
  });
  return vars;
}
export {
  faces_default as default,
  postcssSugarPluginFontFacesInterface as interface
};
