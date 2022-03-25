import __childProcess from "child_process";
import __packageJsonSync from "@coffeekraken/sugar/node/package/jsonSync";
function postprocess(env, config) {
  var _a, _b, _c, _d;
  try {
    if (!((_a = config.repo) == null ? void 0 : _a.url)) {
      const packageJson = __packageJsonSync();
      if ((_b = packageJson.repository) == null ? void 0 : _b.url) {
        config.repo.url = packageJson.repository.url;
      } else {
        const url = __childProcess.execSync("git config --get remote.origin.url").toString().trim();
        config.repo.url = url;
      }
    }
    if (!((_c = config.user) == null ? void 0 : _c.name)) {
      const name = __childProcess.execSync("git config --get user.name").toString().trim();
      config.user.name = name;
    }
    if (!((_d = config.user) == null ? void 0 : _d.email)) {
      const email = __childProcess.execSync("git config --get user.email").toString().trim();
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
export {
  git_config_default as default,
  postprocess
};
