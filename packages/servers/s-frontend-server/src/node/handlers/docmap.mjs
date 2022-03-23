import {
  __spreadProps,
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
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
