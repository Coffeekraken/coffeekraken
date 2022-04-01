import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __SPromise from "@coffeekraken/s-promise";
import __addEventListener from "./addEventListener";
function addEventListenerOnce($elm, eventNames, callback = null, useCapture = false) {
  if (!Array.isArray(eventNames))
    eventNames = [eventNames];
  const globalPromise = new __SPromise({
    id: "addEventListenerOnce"
  });
  const eventsStack = {};
  globalPromise.on("finally", () => {
    eventNames.forEach((eventName) => {
      eventsStack[eventName].promise.cancel();
    });
  });
  eventNames.forEach((eventName) => {
    const promise = __addEventListener($elm, eventName, null, useCapture);
    eventsStack[eventName] = {
      promise
    };
    promise.on(eventNames, (event) => {
      if (callback && typeof callback === "function") {
        callback.apply(this, [event]);
      }
      globalPromise.emit(eventName, event);
      promise.cancel();
    });
  });
  return globalPromise;
}
var addEventListenerOnce_default = addEventListenerOnce;
export {
  addEventListenerOnce_default as default
};
