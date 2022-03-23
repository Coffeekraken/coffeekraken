import {
  __spreadValues
} from "../../../../../chunk-PG3ZPS4G.mjs";
import fastdom from "fastdom";
import __dispatchEvent from "../dom/event/dispatchEvent";
function inputAdditionalEvents(settings = {}) {
  settings = __spreadValues({
    enter: true,
    escape: true
  }, settings);
  function handleInputAttributes(e) {
    const field = e.target ? e.target : e;
    if (!field || !field.tagName)
      return;
    switch (field.tagName) {
      case "INPUT":
      case "TEXTAREA":
        fastdom.mutate(() => {
          if (e.keyCode) {
            switch (e.keyCode) {
              case 13:
                if (settings.enter && field.hasAttribute("onenter")) {
                  eval(field.getAttribute("onenter"));
                  __dispatchEvent(field, "enter");
                }
                break;
              case 27:
                if (settings.escape && field.hasAttribute("onescape")) {
                  eval(field.getAttribute("onescape"));
                  __dispatchEvent(field, "escape");
                }
                break;
            }
          }
        });
        break;
    }
  }
  document.addEventListener("change", handleInputAttributes);
  document.addEventListener("keyup", handleInputAttributes);
}
var inputAdditionalEvents_default = inputAdditionalEvents;
export {
  inputAdditionalEvents_default as default
};
