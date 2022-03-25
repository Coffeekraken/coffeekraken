import __ipAddress from "@coffeekraken/sugar/node/network/utils/ipAddress";
import __fs from "fs";
import __packageRoot from "@coffeekraken/sugar/node/path/packageRoot";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __readJson from "@coffeekraken/sugar/node/fs/readJson";
async function prepare(config) {
  const potentialFrontspecJsonFilePath = `${__packageRoot()}/frontspec.json`;
  if (!__fs.existsSync(potentialFrontspecJsonFilePath))
    return config;
  const json = await __readJson(potentialFrontspecJsonFilePath);
  return __deepMerge(config, json);
}
function frontspec_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {
    head: {
      viteClient: env.env === "development" ? `
        <script>
          document.addEventListener("DOMContentLoaded", function() {
            var $script = document.createElement("script");
            var ip = "${__ipAddress()}";
            $script.setAttribute("type", "module");
            $script.setAttribute("src", "[config.vite.server.hostname]/@vite/client");
            document.body.appendChild($script);
          });
        <\/script>
      ` : ""
    }
  };
}
export {
  frontspec_config_default as default,
  prepare
};
