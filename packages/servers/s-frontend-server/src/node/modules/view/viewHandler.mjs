import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
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
