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
var sendForm_exports = {};
__export(sendForm_exports, {
  default: () => sendForm_default
});
module.exports = __toCommonJS(sendForm_exports);
var import_SAjax = __toESM(require("../http/SAjax"));
var import_form_serialize = __toESM(require("form-serialize"));
function sendForm(form) {
  if (!form.tagName || form.tagName.toLowerCase() !== "form") {
    console.error("passed arguments", form);
    throw `The "form" parameter passed to the "sendForm" function is not a form`;
  }
  const enctype = form.getAttribute("enctype") || "application/x-www-form-urlencoded";
  let data = null;
  if (enctype === "application/x-www-form-urlencoded") {
    data = (0, import_form_serialize.default)(form);
  } else {
    data = new FormData(form);
  }
  const ajx = new import_SAjax.default({
    url: form.getAttribute("action"),
    method: form.getAttribute("method") || "POST",
    data,
    contentType: enctype
  });
  form.setAttribute("loading", true);
  const promise = ajx.send();
  promise.then((success) => {
    form.removeAttribute("loading");
  }, (error) => {
    form.removeAttribute("loading");
  });
  return promise;
}
var sendForm_default = sendForm;
