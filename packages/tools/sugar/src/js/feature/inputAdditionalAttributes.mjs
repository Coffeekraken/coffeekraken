import {
  __spreadValues
} from "../../../../../chunk-PG3ZPS4G.mjs";
import fastdom from "fastdom";
import __querySelectorLive from "../dom/query/querySelectorLive";
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
        fastdom.mutate(() => {
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
      fastdom.mutate(() => {
        field.removeAttribute("dirty");
      });
    });
  }
  __querySelectorLive('select, textarea, input:not([type="submit"])', (elm) => {
    handleInputAttributes(elm);
  });
  document.addEventListener("change", handleInputAttributes);
  document.addEventListener("keyup", handleInputAttributes);
  document.addEventListener("reset", handleFormSubmitOrReset);
  document.addEventListener("submit", handleFormSubmitOrReset);
}
var inputAdditionalAttributes_default = inputAdditionalAttributes;
export {
  inputAdditionalAttributes_default as default
};
