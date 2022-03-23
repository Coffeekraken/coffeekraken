import {
  __toESM
} from "../../../../chunk-TD77TI6B.mjs";
import { registerPreprocessor } from "@riotjs/compiler";
import postcss from "postcss";
function sRiotjsPluginPostcssPreprocessor(postcssPlugins) {
  registerPreprocessor("css", "postcss", async function(code) {
    var _a;
    const plugins = [];
    for (let i = 0; i < postcssPlugins.length; i++) {
      const p = postcssPlugins[i];
      if (typeof p === "string") {
        const { default: plug } = await Promise.resolve().then(() => __toESM(require(p)));
        plugins.push((_a = plug.default) != null ? _a : plug);
      } else {
        plugins.push(p);
      }
    }
    const result = await postcss(plugins).process(code);
    console.log(result);
    return {
      code: result.css,
      map: null
    };
  });
}
export {
  sRiotjsPluginPostcssPreprocessor as default
};
