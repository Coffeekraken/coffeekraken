import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __toString from "@coffeekraken/sugar/shared/string/toString";
import __parse from "@coffeekraken/sugar/shared/string/parse";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __SConfigAdapter from "../../shared/adapters/SConfigAdapter";
import __diff from "@coffeekraken/sugar/shared/object/diff";
class SConfigLsAdapter extends __SConfigAdapter {
  get configLsAdapterSettings() {
    return this.configLsAdapterSettings.configLsAdapter;
  }
  constructor(settings) {
    super(__deepMerge({
      configLsAdapter: {}
    }, settings || {}));
  }
  load() {
    const config = __parse(localStorage.getItem(this.name)) || {};
    return __deepMerge(config.default || {}, config.app || {}, config.user || {});
  }
  save(newConfig = {}) {
    const baseConfig = __deepMerge(this.configLsAdapterSettings.defaultConfig, this.configLsAdapterSettings.appConfig);
    localStorage.setItem(this.name, __toString({
      default: this.configLsAdapterSettings.defaultConfig,
      app: this.configLsAdapterSettings.appConfig,
      user: __diff(baseConfig, newConfig)
    }));
    return true;
  }
}
var SConfigLsAdapter_default = SConfigLsAdapter;
export {
  SConfigLsAdapter_default as default
};
