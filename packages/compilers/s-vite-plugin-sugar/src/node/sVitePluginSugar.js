var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
