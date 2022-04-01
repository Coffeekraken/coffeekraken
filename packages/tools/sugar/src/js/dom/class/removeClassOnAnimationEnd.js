import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __addEventListenerOnce from "./addEventListenerOnce";
import __SPromise from "@coffeekraken/s-promise";
function removeClassOnAnimationEnd($elm, cls) {
  return new __SPromise(({ resolve }) => {
    __addEventListenerOnce($elm, "animationend", (e) => {
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
export {
  removeClassOnAnimationEnd_default as default
};
