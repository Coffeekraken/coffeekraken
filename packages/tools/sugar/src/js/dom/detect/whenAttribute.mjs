import "../../../../../../chunk-PG3ZPS4G.mjs";
import __autoCast from "../../../shared/string/autoCast";
import __observeAttribute from "../observe/observeAttributes";
function whenAttribute(elm, attrName, checkFn = null) {
  return new Promise((resolve, reject) => {
    if (elm.hasAttribute(attrName)) {
      const value = __autoCast(elm.getAttribute(attrName));
      if (checkFn && checkFn(value, value)) {
        resolve(value);
        return;
      } else if (!checkFn) {
        resolve(value);
        return;
      }
    }
    const obs = __observeAttribute(elm).then((mutation) => {
      if (mutation.attributeName === attrName) {
        const value = __autoCast(mutation.target.getAttribute(mutation.attributeName));
        if (checkFn && checkFn(value, mutation.oldValue)) {
          resolve(value);
          obs.cancel();
        } else if (!checkFn) {
          resolve(value);
          obs.cancel();
        }
      }
    });
  });
}
var whenAttribute_default = whenAttribute;
export {
  whenAttribute_default as default
};
