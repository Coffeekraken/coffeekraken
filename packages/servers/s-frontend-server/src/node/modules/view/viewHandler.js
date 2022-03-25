var __defProp = Object.defineProperty;
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
import __SViewRenderer from "@coffeekraken/s-view-renderer";
async function view(req, res, settings = {}) {
  var _a, _b;
  let viewPath;
  if (!req.params[0])
    viewPath = (_a = settings.indexView) != null ? _a : "index";
  else
    viewPath = req.params[0].split("/").join(".");
  const viewInstance = new __SViewRenderer(viewPath);
  const result = await viewInstance.render(__spreadValues({}, (_b = res.templateData) != null ? _b : {}));
  res.status(200);
  res.type("text/html");
  res.send(result.value);
}
export {
  view as default
};
