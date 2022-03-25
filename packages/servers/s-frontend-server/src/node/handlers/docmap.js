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
import __SDocMap from "@coffeekraken/s-docmap";
async function docMap(req, res, settings = {}) {
  return new __SPromise(async ({ resolve, reject, pipe }) => {
    const docMap2 = new __SDocMap();
    const json = await docMap2.read({
      snapshot: req.query.v
    });
    const finalJson = __spreadProps(__spreadValues({}, json), {
      map: {}
    });
    Object.keys(json.map).forEach((key) => {
      const obj = json.map[key];
      if (!obj.platform)
        return;
      if (!obj.status)
        return;
      finalJson.map[key] = obj;
    });
    res.status(200);
    res.type("application/json");
    res.send(finalJson);
    resolve(finalJson);
  });
}
export {
  docMap as default
};
