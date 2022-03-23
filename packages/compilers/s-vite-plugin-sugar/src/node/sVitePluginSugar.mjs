import {
  __spreadProps,
  __spreadValues
} from "../../../../chunk-TD77TI6B.mjs";
import __packageRootDir from "@coffeekraken/sugar/node/path/packageRootDir";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
import __sanitizeJsonString from "@coffeekraken/sugar/shared/json/sanitizeJsonString";
function sVitePluginSugar(settings = {}) {
  const jsReg = /\.(j|t)s(\?.*)?$/;
  let areEnvVarsInjected = false;
  let config;
  const packageRoot = __packageRootDir();
  async function _injectEnvVars(src, id) {
    await __SSugarConfig.load({
      platform: "browser",
      env: "dev"
    }, "browser");
    const browserConfig = __SSugarConfig.toObject("browser");
    let envJsonStr = JSON.stringify(__spreadProps(__spreadValues({}, {
      platform: "browser",
      env: "dev"
    }), {
      config: browserConfig
    }));
    envJsonStr = __sanitizeJsonString(envJsonStr);
    const code = [
      `// sugar variables`,
      `if (!window.env) window.env = {SUGAR:{}};`,
      `window.env.SUGAR = JSON.parse(\`${envJsonStr}\`);`
    ];
    return [code.join("\n"), src].join("\n");
  }
  return {
    name: "s-vite-plugin-sugar",
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    async transform(src, id) {
      var _a, _b, _c;
      if (jsReg.test(id)) {
        if (id.includes(packageRoot) && (id === ((_a = config.build.rollupOptions) == null ? void 0 : _a.input) || id === ((_b = config.build.lib) == null ? void 0 : _b.entry))) {
          if ((_c = config.build.rollupOptions) == null ? void 0 : _c.input) {
            if (!config.build.lib) {
              src = await _injectEnvVars(src, id);
            }
          } else {
            src = await _injectEnvVars(src, id);
          }
        }
        return {
          code: src,
          map: null
        };
      }
    }
  };
}
export {
  sVitePluginSugar as default
};
