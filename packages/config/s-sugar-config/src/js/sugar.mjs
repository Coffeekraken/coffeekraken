import "../../../../chunk-PG3ZPS4G.mjs";
import __get from "@coffeekraken/sugar/shared/object/get";
class SSugarConfig {
  static get(dotpath) {
    var _a, _b, _c;
    return __get((_c = (_b = (_a = window.env) == null ? void 0 : _a.SUGAR) == null ? void 0 : _b.config) != null ? _c : {}, dotpath);
  }
}
export {
  SSugarConfig as default
};
