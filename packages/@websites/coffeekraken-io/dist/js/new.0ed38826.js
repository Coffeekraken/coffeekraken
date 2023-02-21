import { _ as __isNode, S as SStdio } from "./index.dc26cdf3.js";
var __awaiter = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
function _new(id, sources, adapters, settings) {
  return __awaiter(this, void 0, void 0, function* () {
    if (!Array.isArray(sources))
      sources = [sources];
    let stdioInstance;
    if (__isNode()) {
      stdioInstance = new SStdio(id, sources, adapters, settings);
    } else {
      throw new Error(`No stdio implementation found for the current "browser" environment...`);
    }
    return stdioInstance;
  });
}
export {
  _new as default
};
