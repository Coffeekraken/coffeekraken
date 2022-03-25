import __isNode from "@coffeekraken/sugar/shared/is/node";
import __packageJsonSync from "@coffeekraken/sugar/node/package/jsonSync";
if (!__isNode() && !window.env) {
  window.env = {
    SUGAR: {}
  };
} else
  process.env.SUGAR = JSON.stringify({});
const _SEnv = class {
  static get env() {
    var _a, _b, _c, _d, _e, _f;
    if (this._env)
      return this._env;
    if (__isNode()) {
      this._env = {
        ENVIRONMENT: (_a = process.env.NODE_ENV) != null ? _a : "dev",
        ENV: (_b = process.env.NODE_ENV) != null ? _b : "dev",
        PLATFORM: "node"
      };
    } else {
      this._env = {
        ENVIRONMENT: (_d = (_c = window == null ? void 0 : window.env) == null ? void 0 : _c.ENV) != null ? _d : "dev",
        ENV: (_f = (_e = window == null ? void 0 : window.env) == null ? void 0 : _e.ENV) != null ? _f : "dev",
        PLATFORM: "browser"
      };
    }
    return this._env;
  }
  static is(env) {
    env = env.toLowerCase();
    if (env === "dev" || env === "development") {
      if (this.get("environment") === "dev" || this.get("environment") === "development")
        return true;
    } else if (env === "prod" || env === "production") {
      if (this.get("environment") === "prod" || this.get("environment") === "production")
        return true;
    } else {
      return this.get("environment") === env;
    }
    return false;
  }
  static get(name) {
    return this.env[name.toUpperCase()];
  }
  static set(name, value) {
    _SEnv.env[name.toUpperCase()] = value;
    return value;
  }
  static delete(name) {
    delete _SEnv.env[name.toUpperCase()];
  }
};
let SEnv = _SEnv;
SEnv.packageJson = __packageJsonSync();
export {
  SEnv as default
};
