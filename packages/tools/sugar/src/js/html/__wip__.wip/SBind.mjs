import "../../../../../../chunk-PG3ZPS4G.mjs";
import SWatch from "../../shared/object/SWatch";
class SBind {
  constructor() {
    this._bindStack = {
      attr2obj: {},
      obj2attr: {}
    };
    this._mutationObservedElementsStack = [];
    this._digestsMutation = /* @__PURE__ */ new Map();
    this._watcher = new SWatch();
  }
  bind(source, sourcePath, target, targetPath) {
    if (typeof source === "object" && !source.hasOwnProperty("__$SWatch")) {
      source = new SWatch(source);
    }
  }
}
export {
  SBind as default
};
