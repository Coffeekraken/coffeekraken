import __deepMerge from "../object/deepMerge";
import __stripCssComments from "strip-css-comments";
function stripCssComments(css, settings = {}) {
  settings = __deepMerge({
    block: true,
    line: true
  }, settings);
  if (settings.block) {
    css = __stripCssComments(css, {
      preserve: false
    });
  }
  if (settings.line) {
    css = css.replace(/^[\s]{0,99999999}\/\/.*$/gm, "");
  }
  return css;
}
var stripCssComments_default = stripCssComments;
export {
  stripCssComments_default as default
};
