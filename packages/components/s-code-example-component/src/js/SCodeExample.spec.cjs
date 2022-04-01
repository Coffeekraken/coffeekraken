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
var SCodeExample_spec_exports = {};
__export(SCodeExample_spec_exports, {
  purgecss: () => purgecss
});
module.exports = __toCommonJS(SCodeExample_spec_exports);
const purgecss = {
  safelist: {
    standard: [
      "s-tabs",
      "s-btn",
      "s-color",
      "s-color--accent",
      /^language-/
    ],
    greedy: [
      /s-code-example/,
      /hljs/
    ]
  }
};
