import {
  __spreadValues,
  __toESM
} from "../../../../chunk-TD77TI6B.mjs";
import __postcss from "postcss";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
function sVitePluginPostcss() {
  const fileRegex = /\.css(\?.*)?$/;
  const postcssConfig = __SSugarConfig.get("postcss");
  return {
    name: "s-vite-plugin-postcss",
    async transform(src, id) {
      var _a, _b;
      if (fileRegex.test(id)) {
        const plugins = [];
        for (let i = 0; i < postcssConfig.plugins.length; i++) {
          const p = postcssConfig.plugins[i];
          if (typeof p === "string") {
            const { default: plugin } = await Promise.resolve().then(() => __toESM(require(p)));
            const fn = (_a = plugin.default) != null ? _a : plugin;
            const options = (_b = postcssConfig.pluginsOptions[p]) != null ? _b : {};
            plugins.push(fn(__spreadValues({
              target: "vite"
            }, options)));
          } else {
            plugins.push(p);
          }
        }
        const result = await __postcss(plugins).process(src != null ? src : "", {
          from: id.split("?")[0]
        });
        return {
          code: result.css,
          map: null
        };
      }
    }
  };
}
export {
  sVitePluginPostcss as default
};
