import "../../../../../../chunk-JETN4ZEY.mjs";
import __md5 from "../../crypt/md5";
import __availableColors from "./availableColors";
import __pickRandom from "../../array/pickRandom";
import __deepMerge from "../../object/deepMerge";
const _colorUsedByScope = {};
const _colorsStack = {};
function getColorFor(ref, settings) {
  settings = __deepMerge({
    scope: "default",
    excludeBasics: true
  }, settings != null ? settings : {});
  const availableColors = __availableColors(settings);
  const scopeId = __md5.encrypt(settings.scope);
  const refId = __md5.encrypt(ref);
  if (_colorsStack[`${scopeId}.${refId}`])
    return _colorsStack[`${scopeId}.${refId}`];
  if (!_colorUsedByScope[scopeId])
    _colorUsedByScope[scopeId] = [];
  if (_colorUsedByScope[scopeId].length >= availableColors.length) {
    const color = __pickRandom(availableColors);
    _colorsStack[`${scopeId}.${refId}`] = color;
    return color;
  } else {
    for (let i = 0; i < availableColors.length; i++) {
      if (_colorUsedByScope[scopeId].indexOf(availableColors[i]) === -1) {
        _colorUsedByScope[scopeId].push(availableColors[i]);
        _colorsStack[`${scopeId}.${refId}`] = availableColors[i];
        return availableColors[i];
      }
    }
  }
}
export {
  getColorFor as default
};
