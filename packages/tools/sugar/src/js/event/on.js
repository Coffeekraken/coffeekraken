import __SPromise from "@coffeekraken/s-promise";
function on(name, callback) {
  if (!window._sugarEventSPromise)
    window._sugarEventSPromise = new __SPromise({
      id: "sugarEventSPromise"
    });
  window._sugarEventSPromise.on(name, callback);
  return () => {
    window._sugarEventSPromise.off(name, callback);
  };
}
var on_default = on;
export {
  on_default as default
};
