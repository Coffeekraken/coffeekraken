import __isNode from "@coffeekraken/sugar/shared/is/node";
function module_config_default(env) {
  if (env.platform !== "node")
    return;
  return {
    resolve: {
      dirs: ["[config.storage.package.nodeModulesDir]"],
      extensions: ["js", "mjs", "json", "node"],
      fields: ["main", "module", "browser"],
      builtInModules: __isNode() ? true : false,
      preferExports: true,
      method: "import",
      target: __isNode() ? "node" : "default"
    }
  };
}
export {
  module_config_default as default
};
