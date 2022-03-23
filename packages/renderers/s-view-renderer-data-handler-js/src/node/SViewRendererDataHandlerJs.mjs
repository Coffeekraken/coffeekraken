import {
  __toESM
} from "../../../../chunk-TD77TI6B.mjs";
import __SPromise from "@coffeekraken/s-promise";
class SViewRendererDataHandlerJs {
  static handle(filePath) {
    return new __SPromise(async ({ resolve }) => {
      resolve(await Promise.resolve().then(() => __toESM(require(filePath))));
    });
  }
}
SViewRendererDataHandlerJs.extensions = ["js", "json"];
;
export {
  SViewRendererDataHandlerJs as default
};
