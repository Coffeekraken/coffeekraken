import "../../../../../chunk-TD77TI6B.mjs";
import __deepMerge from "../../../../shared/object/deepMerge";
function error(data = {}) {
  data = __deepMerge({
    title: "Error",
    intro: "Somethings wrong happend",
    body: null,
    ctas: [
      {
        text: "Go back",
        href: "javascript:history.back()",
        target: "_self"
      }
    ]
  }, data);
  const settings = __deepMerge(__SugarConfig.get("frontend"), args);
  const server = __express();
  const promise = new __SPromise({
    id: "frontendServerError"
  });
  const templateData = {
    frontspec: JSON.stringify(frontspec),
    env: process.env.NODE_ENV || "development",
    settings: JSON.stringify(settings),
    packageJson: __standardizeJson(require(__packageRootDir() + "/package.json"))
  };
}
var error_default = error;
export {
  error_default as default
};
