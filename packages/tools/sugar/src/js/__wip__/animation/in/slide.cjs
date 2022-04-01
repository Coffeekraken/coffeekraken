import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var slide_exports = {};
__export(slide_exports, {
  default: () => slide_default
});
module.exports = __toCommonJS(slide_exports);
var import_uniqid = __toESM(require("../../../shared/string/uniqid"), 1);
var import_parseArgs = __toESM(require("../../../shared/string/parseArgs"), 1);
var import_querySelectorLive = __toESM(require("../../dom/querySelectorLive"), 1);
var slide_default = (() => {
  (0, import_querySelectorLive.default)("[slide-in]", ($item) => {
    const uniqClass = `slide-in-${(0, import_uniqid.default)()}`;
    $item.classList.add(uniqClass);
    const slideInValue = $item.getAttribute("slide-in");
    const args = (0, import_parseArgs.default)(slideInValue, {
      x: 'Number -x --x "0"',
      y: 'Number -y --y "0"',
      duration: 'Number -d --duration "500"',
      delay: 'Number --delay "0"',
      when: 'String -w --when "inViewport"'
    });
    const css = `
      [slide-in].${uniqClass} {
        opacity: 0;
        transform: translate(${args.x.value || 0}px, ${args.y.value || 0}px);

      }
    `;
    const cssIn = `
      [slide-in].${uniqClass}.in {
        transition: all ${args.duration.value / 1e3 || "0.5"}s;
        opacity: 1;
        transform: translate(0, 0);
      }
    `;
    document.head.innerHTML += `
      <style id="${uniqClass}">
        ${css}
      </style>
    `;
    setTimeout(() => {
      document.head.innerHTML += `
        <style id="${uniqClass}-in">
          ${cssIn}
        </style>
      `;
    }, 100);
    setTimeout(() => {
      $item.classList.add("in");
    }, args.delay.value);
    setTimeout(() => {
      const $style = document.querySelector(`style#${uniqClass}`);
      if ($style)
        $style.parentNode.removeChild($style);
      const $styleIn = document.querySelector(`style#${uniqClass}-in`);
      if ($styleIn)
        $styleIn.parentNode.removeChild($styleIn);
    }, args.delay.value + args.duration.value);
  });
})();
