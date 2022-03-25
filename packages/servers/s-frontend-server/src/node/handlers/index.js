var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import __SPromise from "@coffeekraken/s-promise";
import __SViewRenderer from "@coffeekraken/s-view-renderer";
function doc(req, res, settings = {}) {
  return new __SPromise(async ({ resolve, reject, pipe, emit }) => {
    const indexView = new __SViewRenderer("index");
    const pageHtml = await indexView.render(__spreadProps(__spreadValues({}, res.templateData || {}), {
      body: "Hello world"
    }));
    res.type("text/html");
    res.status(200);
    res.send(pageHtml.value);
    resolve(pageHtml.value);
  });
}
export {
  doc as default
};
