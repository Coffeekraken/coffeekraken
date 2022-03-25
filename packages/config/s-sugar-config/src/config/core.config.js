import __packageRoot from "@coffeekraken/sugar/node/path/packageRoot";
function core_config_default(env) {
  if (env.platform !== "node")
    return;
  return {
    namespace: {
      pattern: "{path}",
      context: __packageRoot()
    }
  };
}
export {
  core_config_default as default
};
