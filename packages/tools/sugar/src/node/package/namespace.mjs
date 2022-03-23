import "../../../../../chunk-TD77TI6B.mjs";
import __json from "./json";
import __deepMerge from "../../shared/object/deepMerge";
import __getFilename from "../fs/filename";
import __SugarConfig from "@coffeekraken/s-sugar-config";
function namespace(path, settings = {}) {
  settings = __deepMerge(__SugarConfig.get("core.namespace") || {}, settings);
  const json = __json(settings.context || process.cwd());
  let packageName = "", packageVersion = "";
  if (json && json.name)
    packageName = json.name.replace("@", "").split("/").join(".").trim();
  if (json && json.version)
    packageVersion = json.version.split(".").join("-");
  let sanitizedPath = path;
  const filename = __getFilename(path);
  if (filename && sanitizedPath.split("/").length > 1) {
    sanitizedPath = sanitizedPath.replace("/" + filename, "").replace(filename, "");
  }
  sanitizedPath = sanitizedPath.split(" ").join("").split("/").join(".");
  let resultNamespace = settings.pattern.replace("{package.name}", packageName).replace("{package.version}", packageVersion).replace("{path}", sanitizedPath).trim();
  resultNamespace = resultNamespace.split("...").join(".").split("..").join(".");
  return resultNamespace;
}
var namespace_default = namespace;
export {
  namespace_default as default
};
