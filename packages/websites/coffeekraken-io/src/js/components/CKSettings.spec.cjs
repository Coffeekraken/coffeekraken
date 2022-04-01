import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var CKSettings_spec_exports = {};
__export(CKSettings_spec_exports, {
  purgecss: () => purgecss
});
module.exports = __toCommonJS(CKSettings_spec_exports);
const purgecss = {
  safelist: [
    "ck-settings",
    "s-p",
    "s-p--40",
    "s-mbe",
    "s-mbe--40",
    "s-typo",
    "s-typo--h3",
    "s-typo--p",
    "__settings",
    "s-bg",
    "s-bg--odd",
    "s-bg--main-surface",
    "s-pi",
    "s-pi--40",
    "s-pb",
    "s-pb--30",
    "s-switch",
    "s-label",
    "s-input"
  ]
};
