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
var removeClassOnAnimationEnd_exports = {};
__export(removeClassOnAnimationEnd_exports, {
  default: () => removeClassOnAnimationEnd_default
});
module.exports = __toCommonJS(removeClassOnAnimationEnd_exports);
var import_addEventListenerOnce = __toESM(require("./addEventListenerOnce"), 1);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
function removeClassOnAnimationEnd($elm, cls) {
  return new import_s_promise.default(({ resolve }) => {
    (0, import_addEventListenerOnce.default)($elm, "animationend", (e) => {
      if (!Array.isArray(cls))
        cls = [cls];
      cls.forEach((_cls) => {
        $elm.classList.remove(_cls);
      });
      resolve(e);
    });
  }, {
    id: "removeClassOnAnimationEnd"
  });
}
var removeClassOnAnimationEnd_default = removeClassOnAnimationEnd;
