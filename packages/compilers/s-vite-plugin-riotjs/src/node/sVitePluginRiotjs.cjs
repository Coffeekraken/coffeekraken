var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var sVitePluginRiotjs_exports = {};
__export(sVitePluginRiotjs_exports, {
  default: () => sVitePluginRiotjs
});
module.exports = __toCommonJS(sVitePluginRiotjs_exports);
var import_compiler = require("@riotjs/compiler");
function sVitePluginRiotjs(riotSettings = {}) {
  const fileRegex = /\.riot(\?.*)?$/;
  return {
    name: "s-vite-plugin-riotjs",
    transform(src, id) {
      if (fileRegex.test(id)) {
        const result = (0, import_compiler.compile)(src, {
          scopedCss: true,
          brackets: ["{", "}"],
          comments: false
        });
        const code = [
          'import * as riot from "riot";',
          `import ____querySelectorLive from '@coffeekraken/sugar/js/dom/query/querySelectorLive';`,
          `import ____uniqid from '@coffeekraken/sugar/shared/string/uniqid';`,
          result.code.replace("export default ", "const Component = "),
          `riot.register('${result.meta.tagName}', Component);`,
          `____querySelectorLive('${result.meta.tagName}:not([mounted])', ($elm) => {`,
          ` const id = $elm.id || '${result.meta.tagName}-' + ____uniqid();
            $elm.setAttribute('id', id);
            riot.mount('#' + id);
          });`,
          `Component.mount = () => {`,
          `riot.mount('${result.meta.tagName}');`,
          `};`,
          "export default Component;"
        ].join("\n");
        return {
          code,
          map: result.map
        };
      }
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
