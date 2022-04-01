import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __WhenInteractSettingsInterface from "./interface/WhenInteractSettingsInterface";
function whenInteract(elm, settings) {
  return new Promise((resolve, reject) => {
    settings = __WhenInteractSettingsInterface.apply(settings != null ? settings : {});
    function interacted(interaction) {
      resolve(interaction);
      elm.removeEventListener("mouseover", mouseover);
      elm.removeEventListener("mouseout", mouseout);
      elm.removeEventListener("click", click);
      elm.removeEventListener("touchstart", touchstart);
      elm.removeEventListener("touchend", touchend);
      elm.removeEventListener("focus", focus);
      elm.removeEventListener("focusin", focus);
    }
    function mouseover(e) {
      interacted("mouseover");
    }
    if (settings.mouseover) {
      elm.addEventListener("mouseover", mouseover);
    }
    function mouseout(e) {
      interacted("mouseout");
    }
    if (settings.mouseout) {
      elm.addEventListener("mouseout", mouseout);
    }
    function click(e) {
      interacted("click");
    }
    if (settings.click) {
      elm.addEventListener("click", click);
    }
    function touchstart(e) {
      interacted("touchstart");
    }
    if (settings.touchstart) {
      elm.addEventListener("touchstart", touchstart);
    }
    function touchend(e) {
      interacted("touchend");
    }
    if (settings.touchend) {
      elm.addEventListener("touchend", touchend);
    }
    function focus(e) {
      interacted("focus");
    }
    if (settings.focus === true) {
      elm.addEventListener("focus", focus);
      elm.addEventListener("focusin", focus);
    }
  });
}
export {
  whenInteract as default
};
