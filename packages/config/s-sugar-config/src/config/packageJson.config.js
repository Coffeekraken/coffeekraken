import __packageJson from "@coffeekraken/sugar/node/package/json";
async function prepare() {
  return await __packageJson();
}
function packageJson_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {};
}
export {
  packageJson_config_default as default,
  prepare
};
