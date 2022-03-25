import { compile } from "@riotjs/compiler";
function sVitePluginRiotjs(riotSettings = {}) {
  const fileRegex = /\.riot(\?.*)?$/;
  return {
    name: "s-vite-plugin-riotjs",
    transform(src, id) {
      if (fileRegex.test(id)) {
        const result = compile(src, {
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
export {
  sVitePluginRiotjs as default
};
