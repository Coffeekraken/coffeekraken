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
var CKSearch_spec_exports = {};
__export(CKSearch_spec_exports, {
  purgecss: () => purgecss
});
module.exports = __toCommonJS(CKSearch_spec_exports);
const purgecss = {
  safelist: {
    standard: [
      /^ck-search/,
      "s-flex",
      "s-flex-item",
      "s-flex-item--grow",
      "s-mbe",
      "s-mbe--10",
      "s-mbe--20",
      "s-typo",
      "s-typo--p",
      "s-typo--bold",
      /^s-tc/,
      /^s-platform/,
      "s-badge",
      "s-color",
      "s-color--main",
      "s-color--accent",
      "s-opacity",
      "s-opacity--50",
      "s-font",
      "s-font--20",
      "s-truncate",
      "s-truncate--2",
      "s-input",
      "s-scale",
      "s-scale--11"
    ],
    greedy: [
      /s-until/
    ]
  }
};
