var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var inputAdditionalAttributes_exports = {};
__export(inputAdditionalAttributes_exports, {
  default: () => inputAdditionalAttributes_default
});
module.exports = __toCommonJS(inputAdditionalAttributes_exports);
var import_fastdom = __toESM(require("fastdom"));
var import_querySelectorLive = __toESM(require("../dom/query/querySelectorLive"));
function inputAdditionalAttributes(settings = {}) {
  settings = __spreadValues({
    empty: true,
    hasValue: true,
    dirty: true
  }, settings);
  function handleInputAttributes(eOrElm) {
    const field = eOrElm.target ? eOrElm.target : eOrElm;
    if (!field || !field.tagName)
      return;
    switch (field.tagName) {
      case "INPUT":
      case "TEXTAREA":
      case "SELECT":
        import_fastdom.default.mutate(() => {
          if (field.type && (field.type === "checkbox" || field.type === "radio"))
            return;
          if (field.value && !field.hasAttribute("has-value")) {
            if (settings.hasValue) {
              field.setAttribute("has-value", true);
            }
            if (settings.empty) {
              field.removeAttribute("empty");
            }
          } else if (field.value === void 0 || field.value === null || field.value === "") {
            if (settings.hasValue) {
              field.removeAttribute("has-value");
            }
            field.removeAttribute("value");
            if (settings.empty) {
              if (!field.hasAttribute("empty")) {
                field.setAttribute("empty", true);
              }
            }
          }
          if (settings.dirty) {
            if (!field.hasAttribute("dirty") && field.value) {
              field.setAttribute("dirty", true);
            }
          }
        });
        break;
    }
  }
  function handleFormSubmitOrReset(e) {
    [].forEach.call(e.target.elements, (field) => {
      handleInputAttributes(field);
      if (e.type === "submit")
        return;
      import_fastdom.default.mutate(() => {
        field.removeAttribute("dirty");
      });
    });
  }
  (0, import_querySelectorLive.default)('select, textarea, input:not([type="submit"])', (elm) => {
    handleInputAttributes(elm);
  });
  document.addEventListener("change", handleInputAttributes);
  document.addEventListener("keyup", handleInputAttributes);
  document.addEventListener("reset", handleFormSubmitOrReset);
  document.addEventListener("submit", handleFormSubmitOrReset);
}
var inputAdditionalAttributes_default = inputAdditionalAttributes;
