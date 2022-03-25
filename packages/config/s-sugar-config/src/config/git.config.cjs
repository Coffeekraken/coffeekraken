var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var git_config_exports = {};
__export(git_config_exports, {
  default: () => git_config_default,
  postprocess: () => postprocess
});
module.exports = __toCommonJS(git_config_exports);
var import_child_process = __toESM(require("child_process"));
var import_jsonSync = __toESM(require("@coffeekraken/sugar/node/package/jsonSync"));
function postprocess(env, config) {
  var _a, _b, _c, _d;
  try {
    if (!((_a = config.repo) == null ? void 0 : _a.url)) {
      const packageJson = (0, import_jsonSync.default)();
      if ((_b = packageJson.repository) == null ? void 0 : _b.url) {
        config.repo.url = packageJson.repository.url;
      } else {
        const url = import_child_process.default.execSync("git config --get remote.origin.url").toString().trim();
        config.repo.url = url;
      }
    }
    if (!((_c = config.user) == null ? void 0 : _c.name)) {
      const name = import_child_process.default.execSync("git config --get user.name").toString().trim();
      config.user.name = name;
    }
    if (!((_d = config.user) == null ? void 0 : _d.email)) {
      const email = import_child_process.default.execSync("git config --get user.email").toString().trim();
      config.user.email = email;
    }
  } catch (e) {
  }
  return config;
}
function git_config_default(env) {
  if (env.platform !== "node")
    return;
  return {
    user: {
      name: void 0,
      email: void 0
    },
    repo: {
      url: void 0
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  postprocess
});
