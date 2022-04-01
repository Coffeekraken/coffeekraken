import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import camelize from "../../../shared/string/camelize";
import autoCast from "../../../shared/string/autoCast";
function getStyleProperty(elm, property) {
  setTimeout(() => {
    elm._sComputedStyle = null;
  });
  const computed = elm._sComputedStyle || window.getComputedStyle(elm);
  elm._sComputedStyle = computed;
  const prefixes = ["", "webkit-", "moz-", "ms-", "o-", "khtml-"];
  for (let i = 0; i < prefixes.length; i++) {
    const prefix = prefixes[i];
    const value = computed[camelize(`${prefix}${property}`)];
    if (value && value.trim() !== "")
      return autoCast(value);
  }
  return null;
}
var getStyleProperty_default = getStyleProperty;
export {
  getStyleProperty_default as default
};
