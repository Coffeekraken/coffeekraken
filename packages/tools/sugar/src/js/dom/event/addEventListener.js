import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __SPromise from "@coffeekraken/s-promise";
function addEventListener($elm, eventNames, callback = null, useCapture = false) {
  if (!Array.isArray(eventNames))
    eventNames = eventNames.split(",").map((e) => e.trim());
  if (callback && typeof callback === "function")
    callback = callback;
  else if (callback && typeof callback === "boolean")
    useCapture = callback;
  const eventsStack = {};
  const promise = new __SPromise({
    id: "addEventListener"
  }).on("finally", () => {
    eventNames.forEach((eventName) => {
      const stack = eventsStack[eventName];
      $elm.removeEventListener(eventName, stack.callback, stack.useCapture);
    });
  });
  eventNames.forEach((eventName) => {
    const internalCallback = (event) => {
      if (callback)
        callback.apply(this, [event]);
      promise.emit(eventName, event);
    };
    eventsStack[eventName] = {
      callback: internalCallback,
      useCapture
    };
    $elm.addEventListener(eventName, internalCallback, useCapture);
  });
  return promise;
}
var addEventListener_default = addEventListener;
export {
  addEventListener_default as default
};
