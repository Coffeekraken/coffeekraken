import {
  __toESM
} from "../../../../../chunk-TD77TI6B.mjs";
import __SPromise from "@coffeekraken/s-promise";
var js_default = {
  name: "JsDataHandler",
  extensions: ["js", "json"],
  handle(filePath) {
    return new __SPromise(async ({ resolve }) => {
      resolve(await Promise.resolve().then(() => __toESM(require(filePath))));
    });
  }
};
export {
  js_default as default
};
