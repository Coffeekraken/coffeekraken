import {
  __spreadProps,
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
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
